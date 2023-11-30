type MapFunctionType = (value: any) => any;
type MapKeyFunctionType = [string, (value: any) => any];
type MapType = Record<string, string | MapFunctionType | MapKeyFunctionType>;

const mappingKey = (data: any, key: string, mapping?: MapType) => {
  let value = data[key];
  if (mapping) {
    const keysMapping = Object.keys(mapping);
    if (keysMapping?.includes(key)) {
      const mappingValue = mapping[key];
      if (Array.isArray(mappingValue)) {
        const [keyMapped, transformValue] = mappingValue as MapKeyFunctionType;
        value = transformValue(value);
        return [keyMapped, value];
      } else if (typeof mappingValue === 'function') {
        value = mappingValue(value);
        return [key, value];
      }

      return [mappingValue, value];
    }
  }
  return [key, value];
};

/**
 * Mapeia e transforma os dados de um objeto para um novo objeto de tipo diferente.
 *
 * @param data - O objeto de origem a ser mapeado.
 * @param mapping - Um objeto que contém um mapeamento de chaves entre o objeto de origem e o objeto de destino.
 * @param keys - Uma matriz de chaves a serem consideradas durante o mapeamento. Se especificado, apenas as chaves fornecidas serão processadas.
 * @param action - A ação a ser realizada nas chaves especificadas. Pode ser 'remove' para remover as chaves ou 'keep' para mantê-las.
 *
 * @returns Um novo objeto do tipo R resultante do mapeamento.
 */
const mapTo = <T, R>(
  data: T,
  mapping?: MapType,
  keys?: string[],
  action: 'remove' | 'keep' = 'remove'
): R => {
  if (!data) return {} as R;
  const newData = {} as R;
  const keysData = Object.keys(data);
  for (const key of keysData) {
    if (keys?.includes(key) && action === 'remove') continue;
    if (keys?.includes(key) && action === 'keep') {
      const [newKey, value] = mappingKey(data, key, mapping);
      newData[newKey as keyof R] = value;
      continue;
    }
    if (keys?.length === 0 || action !== 'keep') {
      const [newKey, value] = mappingKey(data, key, mapping);
      newData[newKey as keyof R] = value;
    }
  }
  return newData;
};

export { mapTo };

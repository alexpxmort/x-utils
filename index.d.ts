

type MapFunctionType = (value: any) => any;
type MapKeyFunctionType = [string, (value: any) => any];
type MapType = Record<string, string | MapFunctionType | MapKeyFunctionType>;

declare module 'x-utils-rx' {
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
  export function mapTo<T, R>(
    data: T,
    mapping?: MapType,
    keys?: string[],
    action?: 'remove' | 'keep'
  ): R;
}

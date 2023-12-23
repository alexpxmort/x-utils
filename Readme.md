# x-utils-rx

Biblioteca x-utils-rx para mapeamento e transformação de dados em objetos JavaScript.<br>
NPM - https://www.npmjs.com/package/x-utils-rx
## Instalação

Para instalar a biblioteca, utilize o seguinte comando:

```bash
npm install x-utils-rx
```
ou

```bash
yarn  add x-utils-rx
```
<h1>Uso</h1>
<p>Exemplos de como utilizar a biblioteca:</p>

```typescript
import { mapTo } from 'x-utils-rx';

const data = {
  name: 'John Doe',
  age: 25,
  // ... outros dados ...
};

const mapping = {
  name: 'fullName',
  age: (value) => value + 5,
};

const result = mapTo(data, mapping);
console.log(result);
```


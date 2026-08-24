# Начало работы {#getting-started}

Vue JSX Vapor — это компилятор Vue JSX, вдохновлённый компилятором Vue, написанный на Rust 🦀 и использующий Oxc. Он поддерживает генерацию кода как для Virtual DOM, так и для Vapor Mode.

Предполагается, что вы уже знакомы с основами Vue.

## Предварительные требования {#prerequisites}

- Для **Vapor Mode** требуется Vue 3.6 или новее. Если проект использует только Virtual DOM (режим совместимости), достаточно Vue 3.0+.
- Если вы планируете использовать директивы или макросы, рекомендуется установить расширение [TS Macro](https://marketplace.visualstudio.com/items?itemName=zhiyuanzmj.vscode-ts-macro) для VSCode. Оно подключает плагин Volar для TSX. Кроме того, для проверки типов используйте `@ts-macro/tsc` вместо `tsc`:

  ```json
  // package.json
  {
    "scripts": {
      "typecheck": "tsmc --noEmit"
    }
  }
  ```

## Установка {#installation}

```bash
# Плагин
pnpm add vue-jsx-vapor

# Рантайм
pnpm add vue@3.6.0-rc.5
```

## Настройка {#configuration}

::: code-group

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vueJsxVapor from 'vue-jsx-vapor/vite'

export default defineConfig({
  plugins: [
    vueJsxVapor({
      macros: true,
    }),
  ],
})
```

:::

## Настройка TypeScript {#typescript-configuration}

### tsconfig.json

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "vue-jsx-vapor"
  }
}
```

### Плагин Volar {#volar-plugin}

Расширение TS Macro для VSCode автоматически подключает `vue-jsx-vapor/volar`, анализируя файл `vite.config.ts`. Оно использует ту же конфигурацию, что и плагин `vue-jsx-vapor/vite`, поэтому вручную настраивать `ts-macro.config.ts` не требуется.

::: details Ручная настройка

::: code-group

```ts [ts-macro.config.ts]
import vueJsxVapor from 'vue-jsx-vapor/volar'

export default {
  plugins: [
    vueJsxVapor({
      macros: true,
    }),
  ],
}
```

:::

## Стартовые шаблоны {#starter-templates}

- [vitesse-jsx-vapor](https://github.com/zhiyuanzmj/vitesse-jsx-vapor) — готовый шаблон с преднастроенной конфигурацией
- [vue-jsx-vapor-ssr](https://github.com/zhiyuanzmj/vue-jsx-vapor-ssr) — пример проекта с SSR

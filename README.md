# vue-jsx-vapor

[![Версия NPM](https://img.shields.io/npm/v/vue-jsx-vapor?color=a1b858&label=)](https://npmx.dev/package/vue-jsx-vapor)

Режим Vapor для Vue JSX (русскоязычная документация).

## Возможности

- ⚡️ **Высокая производительность:** обеспечивает такую же производительность, как и Vue Vapor.
- ⚒️ **Директивы:** полная поддержка всех встроенных директив Vue в синтаксисе JSX.
- ✨ **Макросы:** поддерживает большинство макросов Vue и оптимизирован для использования с JSX.
- 🦀 **Компилятор на Rust:** работает на базе Oxc; в 35 раз быстрее Babel (Virtual DOM) и в 50 раз быстрее (Vapor).
- 🦾 **Типобезопасность:** поддержка Volar через установку TS Macro (плагин для VSCode).
- ⚙️ **Интеграция с ESLint:** включает плагин ESLint для автоматического форматирования директив и макросов.

## Установка

```bash
npm i vue-jsx-vapor
```

## Использование

- [📜 Документация](https://dragomano.github.io/vue-jsx-vapor-russian/)
- [🛰️ Песочница](https://repl.zmjs.dev/vuejs/vue-jsx-vapor)

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import VueJsxVapor from 'vue-jsx-vapor/vite'

export default defineConfig({
  plugins: [VueJsxVapor()],
})
```

Пример: [`playground/`](https://github.com/vuejs/vue-jsx-vapor/tree/main/playground)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import VueJsxVapor from 'vue-jsx-vapor/rollup'

export default {
  plugins: [VueJsxVapor()],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [require('vue-jsx-vapor/webpack')()],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: ['vue-jsx-vapor/nuxt'],
})
```

> Этот модуль работает как с Nuxt 2, так и с [Nuxt Vite](https://github.com/nuxt/vite).

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [require('vue-jsx-vapor/webpack')()],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import VueJsxVapor from 'vue-jsx-vapor/esbuild'

build({
  plugins: [VueJsxVapor()],
})
```

<br></details>
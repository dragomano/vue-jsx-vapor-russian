# ESLint

Плагин ESLint для `vue-jsx-vapor`, который предоставляет автоматическое форматирование кода для директив и макросов.

## Установка {#installation}

```sh
pnpm add @vue-jsx-vapor/eslint
```

## Конфигурация {#configuration}

```ts
// eslint.config.ts
import vueJsxVapor from '@vue-jsx-vapor/eslint'

export default [
  vueJsxVapor()
]
```

## Правила {#rules}

### define-style

Форматирует стили внутри макроса `defineStyle` с помощью Prettier.

```ts twoslash
import vueJsxVapor from '@vue-jsx-vapor/eslint'

export default [
  vueJsxVapor({
    rules: {
      'vue-jsx-vapor/define-style': [1, { tabWidth: 2 }]
    }
  })
]
```

### jsx-sort-props

Модифицированная версия [@stylistic/jsx/jsx-sort-props](https://v4.eslint.style/rules/jsx/jsx-sort-props) с поддержкой пользовательских параметров `reservedFirst` и `reservedLast`.

```ts twoslash
import vueJsxVapor from '@vue-jsx-vapor/eslint'

export default [
  vueJsxVapor({
    rules: {
      'vue-jsx-vapor/jsx-sort-props': [2, {
        reservedFirst: ['v-if', 'v-for'],
        reservedLast: ['v-slot'],
      }]
    }
  })
]
```

#### `reservedFirst`

**По умолчанию:** `['v-if', 'v-else-if', 'v-else', 'v-for', 'key', 'ref', 'v-model']`

Если передать массив, эти значения заменяют список зарезервированных свойств по умолчанию. Свойства, указанные здесь, будут располагаться в начале, сохраняя заданный порядок:

```jsx
// До
const Before = <App a v-for={i in list} v-if={list} b />

// После
const After = <App v-if={list} v-for={i in list} a b />
```

#### `reservedLast`

**По умолчанию:** `['v-slot', 'v-slots', 'v-text', 'v-html']`

Если передать массив, эти свойства будут размещены после всех остальных свойств, сохраняя заданный порядок:

```jsx
// До
const Before = <App v-slot={{ foo }} onClick={onClick} />

// После
const After = <App onClick={onClick} v-slot={{ foo }} />
```

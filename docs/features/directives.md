# Директивы {#directives}

Vue JSX Vapor предоставляет полную поддержку встроенных директив Vue в синтаксисе JSX.

|           Директива           |        Vue         |       Volar        |
| :---------------------------: | :----------------: | :----------------: |
| `v-if`, `v-else-if`, `v-else` | :white_check_mark: | :white_check_mark: |
|      `v-slot`, `v-slots`      | :white_check_mark: | :white_check_mark: |
|            `v-for`            | :white_check_mark: | :white_check_mark: |
|           `v-model`           | :white_check_mark: | :white_check_mark: |
|      `v-html`, `v-text`       | :white_check_mark: |         /          |
|           `v-once`            | :white_check_mark: |         /          |

## `v-if`, `v-else-if`, `v-else`

Директивы условного отображения работают без дополнительной настройки и поддерживают корректное сужение типов.

```tsx twoslash
export default ({ foo = 0 }) => {
  // ---cut-start---
  // prettier-ignore
  // ---cut-end---
  return (
    <>
      <div v-if={foo === 0}>{foo}</div>

      <div v-else-if={foo === 1}>{foo}</div>
      //                          ^?

      <div v-else>{foo}</div>
      //           ^?
    </>
  )
}
```

## `v-for`

Директива отображения списков для перебора массивов или диапазонов.

```tsx twoslash
export default () => (
  <div v-for={(item, index) in 4} key={index}>
    {item}
  </div>
)
```

## `v-slot`, `v-slots`

> [!WARNING]
> Значения параметров по умолчанию при деструктуризации области видимости слота (например, `v-slot={({ foo = '' })}`) не поддерживаются из-за ограничений генерации AST.

::: code-group

```tsx [v-slot] twoslash
const Comp = () => {
  defineSlots<{
    default: () => any
    slot: (scope: { bar: number }) => any
    slots: (scope: { baz: boolean }) => any
  }>()
  return <div />
}

// ---cut-start---
// prettier-ignore
// ---cut-end---
export default () => (
  <Comp>
    default slot
    <template v-slot:slot={{ bar }}>
      //              ^|
      {bar}
    </template>
  </Comp>
)
```

```tsx [v-slots] twoslash
const Comp = () => {
  defineSlots<{
    default: () => any
    slot: (scope: { bar: number }) => any
    slots: (scope: { baz: boolean }) => any
  }>()
  return <div />
}

export default () => (
  <Comp
    v-slots={{
      default: () => <>default slot</>,
      slot: ({ bar }) => <>{bar}</>,
    }}
  />
)
```

:::

## Модификаторы {#modifiers}

Модификаторы — это специальные постфиксы, обозначаемые символом `_`, которые указывают, что директива должна быть привязана определённым образом. Поскольку JSX не поддерживает символ `.` в именах атрибутов, вместо него используется `_`.

```tsx
<form onSubmit_prevent>
  <input v-model_number={value} />
</form>
```

## Динамические аргументы {#dynamic-arguments}

Переменные можно использовать в качестве аргумента директивы, передав их вторым элементом массива в качестве значения. Третий элемент массива используется для модификаторов директивы.

### `v-model`

```tsx twoslash
import { ref } from 'vue'

const Comp = () => {
  const model = defineModel<string, 'm1' | 'm2'>('model')
  const models = defineModel<string>('models')
  return <div />
}

export default () => {
  const foo = ref('')
  const name = ref('model')
  return (
    <Comp
      v-model={[foo.value, name.value, ['m1', 'm2']]}
      v-model:model={foo.value}
      //       ^|
    />
  )
}
```

### `v-slot`

```tsx twoslash
const Comp = () => {
  const slots = defineSlots<{
    default: () => any
  }>()
  return <div />
}

export default (_, { slots }: { slots: { default: () => any } }) => (
  <Comp>
    <template v-for={(Slot, name) in slots} v-slot={[scope, name]}>
      <Slot {...scope} />
    </template>
  </Comp>
)
```

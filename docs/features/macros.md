# Макросы {#macros}

Коллекция макросов, выполняемых при компиляции JSX. Эти макросы необходимо включить явно, установив опцию `macros` в значение `true`.

## Настройка {#setup}

::: code-group

```ts {7} [vite.config.ts]
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

```ts {6} [ts-macro.config.ts]
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

::: details Установка как отдельного плагина

Также доступен отдельный плагин для использования в проектах с Virtual DOM.

```bash
pnpm add @vue-jsx-vapor/macros -D
```

Конфигурация:

```ts
// vite.config.ts
import jsxMacros from '@vue-jsx-vapor/macros/vite'

export default {
  plugins: [jsxMacros()],
}
```

:::

## defineComponent | defineVaporComponent

`defineComponent` используется для определения компонентов Virtual DOM, а `defineVaporComponent` — для определения компонентов Vapor.

### Опции {#options}

```ts
VueJsxVapor({
  defineComponent: {
    /**
     * @default ['defineComponent','defineVaporComponent']
     *
     * Установите пустой массив в качестве alias, чтобы отключить макрос defineComponent.
     */
    alias: [],
  },
})
```

### Возможности {#features}

- Поддерживает использование ключевого слова `await` в асинхронных функциях `setup`.
- Автоматически собирает используемые пропсы и добавляет их в опцию `props` компонента.

```tsx twoslash
import { defineComponent, nextTick, Suspense, useAttrs } from 'vue'

const Comp = defineComponent(
  async (props: {
    foo?: string
    bar?: string
    // ^ Неиспользуемые пропсы рассматриваются как атрибуты, передаваемые дальше.
  }) => {
    await nextTick()
    const attrs = useAttrs()
    return () => (
      <div>
        <span {...attrs}>{props.foo}</span>
      </div>
    )
  },
)

export default () => (
  <Suspense>
    <Comp foo="foo" bar="bar" />
  </Suspense>
)
```

::: details Скомпилированный код

```tsx
import { defineComponent, useAttrs, withAsyncContext } from 'vue'
defineComponent(
  async (props) => {
    let __temp, __restore
    ;(([__temp, __restore] = withAsyncContext(() => nextTick())),
      await __temp,
      __restore())
    const attrs = useAttrs()
    return () => (
      <div>
        <span {...attrs}>{props.foo}</span>
      </div>
    )
  },
  { props: { foo: null } },
)
```

:::

### Обработка пропсов {#props-handling}

- Деструктурированные пропсы автоматически преобразуются обратно для сохранения реактивности.
- Добавьте `!` к значению по умолчанию, чтобы пометить конкретный проп как обязательный.
- Остаточные параметры в пропсах преобразуются в `useAttrs()`, а `inheritAttrs` по умолчанию имеет значение `false`.

```tsx twoslash
// @errors: 2322
import { defineVaporComponent } from 'vue'

const Comp = defineVaporComponent(
  <T,>({ foo = undefined as T, bar = ''!, ...attrs }) => {
    return (
      <div>
        <span {...attrs}>{foo}</span>
      </div>
    )
  },
)

export default () => <Comp<string> foo={1} bar="bar" />
```

::: details Скомпилированный код

```tsx
import { defineVaporComponent } from 'vue'
import { createPropsDefaultProxy } from '/vue-macros/jsx-macros/with-defaults'
defineVaporComponent(
  (_props) => {
    const props = createPropsDefaultProxy(_props, { bar: '' })
    const attrs = useAttrs()
    return () => (
      <div>
        <span {...attrs}>{props.foo}</span>
      </div>
    )
  },
  { props: { foo: null, bar: { required: true } }, inheritAttrs: false },
)
```

:::

## defineModel

### Ограничения {#limitations}

- Имена моделей с дефисами не поддерживаются.

### Возможности {#features-1}

- Добавьте `!`, чтобы пометить модель как обязательную.
- Значения моделей можно читать синхронно после изменения без ожидания `nextTick()`. [Связанная проблема](https://github.com/vuejs/core/issues/11080)

```tsx twoslash
import { ref } from 'vue'

function Comp() {
  const modelValue = defineModel<string>()!
  modelValue.value = 'foo'
  return <div>{modelValue.value}</div>
  //                      ^?
}

export default () => {
  const foo = ref('')
  return <input value={foo.value} />
}
```

::: details Скомпилированный код

```tsx
import { ref } from 'vue'
import { useModel } from '/vue-macros/jsx-macros/use-model'

function Comp(_props: {
  modelValue: string
  'onUpdate:modelValue': (value: string) => any
}) {
  const modelValue = useModel<string>(_props, 'modelValue', { required: true })
  modelValue.value = 'foo'
  return <div>{modelValue.value}</div>
}
```

:::

## defineSlots

### Обобщённые слоты {#generic-slots}

При использовании обобщений для определения слотов все слоты считаются необязательными.

```tsx twoslash
const slots = defineSlots<{
  default: () => any
}>()

slots.default?.()
//           ^ необязательный
```

### Значения слотов по умолчанию (рекомендуется) {#default-slot-values-recommended}

Предоставление реализаций слотов по умолчанию является рекомендуемым подходом.

```tsx twoslash
function Comp<const T>() {
  const slots = defineSlots({
    title: (props: { bar?: T }) => <div>title slot: {props.bar}</div>,
    default: (props: { foo: number }) => <div>default slot: {props.foo}</div>,
  })

  return (
    <>
      <slots.title />
      <slots.default foo={1} />
    </>
  )
}

// ---cut-start---
// prettier-ignore
// ---cut-end---
export default () => (
  <Comp<1>>
    <template v-slot={{ foo }}>{foo}</template>
    <template v-slot:title={{ bar }}>{bar}</template>
    //                        ^?
  </Comp>
)
```

## defineExpose

Работает аналогично `defineExpose` в однофайловых компонентах Vue.

```tsx twoslash
import { useRef } from 'vue-jsx-vapor'

const Comp = <T,>({ foo = undefined as T }) => {
  defineExpose({
    foo,
  })
  return <div />
}

export default () => {
  const compRef = useRef()
  compRef.value?.foo
  //             ^?

  return <Comp ref={compRef} foo={1 as const} />
}
```

::: details Скомпилированный код

```tsx
import { currentInstance } from 'vue'
import { useRef } from 'vue-jsx-vapor'
import { useExpose } from '/vue-macros/jsx-macros/use-expose'

const Comp = ({ foo }) => {
  currentInstance.exposed = {
    foo,
  }
  return <div />
}
```

:::

## defineStyle

```ts
declare function defineStyle(
  style: string,
  options?: { scoped?: boolean },
): void
```

### Возможности {#features-2}

- Поддерживает привязку CSS-переменных и переменных JavaScript.
- В одном файле можно использовать несколько вызовов `defineStyle`.
- Поддерживает CSS-препроцессоры: `css`, `scss`, `sass`, `less`, `stylus`, `postcss`.

```ts
defineStyle.scss(`...`)
defineStyle.stylus(`...`)
// ...
```

### Изолированные стили {#scoped-styles}

- Определения верхнего уровня по умолчанию имеют значение `scoped: false`.
- Определения внутри функций по умолчанию имеют значение `scoped: true`.

```tsx twoslash
function Comp({ color = 'red' }) {
  defineStyle.scss(`
    .foo {
      color: ${color};

      :deep(.bar) {
        color: blue;
      }
    }
  `)
  return (
    <div color="red" class="foo bar">
      foo
    </div>
  )
}

defineStyle(`
  .bar {
    background: black;
  }
`)
```

### CSS-модули {#css-modules}

Присвоение `defineStyle` переменной включает поддержку CSS-модулей.

```tsx twoslash
export default () => {
  const styles = defineStyle.scss(`
    .foo {
      color: blue;
      .bar {
        background: red;
      }
    }
  `)

  return <div class={styles.bar} />
  //                         ^?
}
```

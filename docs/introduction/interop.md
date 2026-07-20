# Совместимость {#interop}

`vue-jsx-vapor` обеспечивает бесшовную совместимость между режимами рендеринга Virtual DOM и Vapor DOM. Если параметр `interop` установлен в `true`, JSX-код внутри `defineVaporComponent` компилируется в Vapor DOM, а JSX-код вне `defineVaporComponent` — в Virtual DOM.

## Встраивание компонентов Vapor в Virtual DOM {#embedding-vapor-components-in-virtual-dom}

[Песочница](https://repl.zmjs.dev/vuejs/vapor-in-virtual-dom)

::: code-group

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vueJsxVapor from 'vue-jsx-vapor/vite'

export default defineConfig({
  plugins: [
    vueJsxVapor({
      interop: true,
    }),
  ],
})
```

```ts [main.ts]
import { createApp, vaporInteropPlugin } from 'vue'
import App from './App.tsx'
createApp(App).use(vaporInteropPlugin).mount('#app')
```

```tsx [App.tsx] twoslash
import {
  computed,
  defineComponent,
  defineVaporComponent,
  ref,
} from 'vue'
import { useRef } from 'vue-jsx-vapor'

const Comp = defineVaporComponent(({ count = 0 }) => {
  defineExpose({
    double: computed(() => count * 2),
  })
  return <span> x 2 = </span>
})

export default defineComponent(() => {
  const count = ref(1)
  const compRef = useRef()
  return () => (
    <>
      <input v-model={count.value} />
      <Comp count={count.value} ref={compRef}></Comp>
      {compRef.value?.double}
    </>
  )
})
```

:::

## Встраивание компонентов Virtual DOM в Vapor {#embedding-virtual-dom-components-in-vapor}

[Песочница](https://repl.zmjs.dev/vuejs/virtual-dom-in-vapor)

::: code-group

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vueJsxVapor from 'vue-jsx-vapor/vite'

export default defineConfig({
  plugins: [
    vueJsxVapor({
      macros: true,
      interop: true,
    }),
  ],
})
```

```ts [main.ts]
import { createVaporApp, vaporInteropPlugin } from 'vue'
import App from './App.tsx'
createVaporApp(App).use(vaporInteropPlugin).mount('#app')
```

```tsx [App.tsx] twoslash
import {
  computed,
  defineComponent,
  defineVaporComponent,
  ref,
} from 'vue'
import { useRef } from 'vue-jsx-vapor'

const Comp = defineVaporComponent(({ count = 0 }) => {
  defineExpose({
    double: computed(() => count * 2),
  })
  return <span> x 2 = </span>
})

export default defineComponent(() => {
  const count = ref(1)
  const compRef = useRef()
  return () => (
    <>
      <input v-model={count.value}/>
      <Comp count={count.value} ref={compRef}></Comp>
      {compRef.value?.double}
    </>
  )
})
```

:::
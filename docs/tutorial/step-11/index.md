---
aside: false
prev: false
next: false
---

# Публикация состояния {#expose}

<script setup>
import appCode from './app.tsx?raw'
import appSolvedCode from './app-solved.tsx?raw'
import appInteropCode from './app-interop.tsx?raw'
import appInteropSolvedCode from './app-interop-solved.tsx?raw'
import appMacrosCode from './app-macros.tsx?raw'
import appMacrosSolvedCode from './app-macros-solved.tsx?raw'
import appInteropMacrosCode from './app-interop-macros.tsx?raw'
import appInteropMacrosSolvedCode from './app-interop-macros-solved.tsx?raw'
import { getDefaultFiles } from '../template'
import { ref } from 'vue'

const files = ref(getDefaultFiles())
const apps = {
  app: { 'src/App.tsx': appCode },
  solved: { 'src/App.tsx': appSolvedCode },
  interop: { 'src/App.tsx': appInteropCode },
  interopSolved: { 'src/App.tsx': appInteropSolvedCode },
  macros: { 'src/App.tsx': appMacrosCode },
  macrosSolved: { 'src/App.tsx': appMacrosSolvedCode },
  interopMacros: { 'src/App.tsx': appInteropMacrosCode },
  interopMacrosSolved: { 'src/App.tsx': appInteropMacrosSolvedCode },
}
</script>

<jsx-repl :files :apps prev="/tutorial/step-10/" next="/tutorial/step-12/">

Если вы хотите получить доступ к состоянию дочернего компонента из родительского, это можно сделать двумя способами:

1. Использовать функцию `expose`, передаваемую во втором параметре контекста функционального компонента.
```jsx
import { computed } from 'vue'

const Comp = (props, { expose }) => {
  const double = computed(() => props.count * 2)
  expose({
    double
  })
  return []
}
```

2. Включить опцию `macros` и использовать макрос `defineExpose` для публикации состояния.

```jsx
import { computed } from 'vue'

const Comp = (props) => {
  const double = computed(() => props.count * 2)
  defineExpose({
    double
  })
  return []
}
```

## Доступ к опубликованному состоянию
Чтобы получить доступ к опубликованному состоянию и использовать его в дальнейшем, можно воспользоваться пропом `ref`:

```jsx
import { shallowRef } from 'vue'

export default () => {
  const compRef = shallowRef()
  return (
    <>
      <Comp ref={compRef} count={1} />
      {compRef.value?.double}
    </>
  )
}
```

::: tip
Также для получения опубликованного состояния можно использовать API `useRef` из `vue-jsx-vapor`. Это псевдоним `shallowRef`, который автоматически выводит типы опубликованного состояния компонента.

```tsx twoslash
import { computed } from 'vue'
import { useRef } from 'vue-jsx-vapor'

const Comp = (props: { count: number }) => {
  const double = computed(() => props.count * 2)
  defineExpose({
    double
  })
  return []
}

export default () => {
  const compRef = useRef()
  return (
    <>
      <Comp ref={compRef} count={1} />
      {compRef.value?.double}
    </>
  )
}
```
:::

Теперь попробуйте сами — задайте проп `ref` для компонента `<Comp>`.

</jsx-repl>

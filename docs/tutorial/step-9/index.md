---
aside: false
prev: false
next: false
---

# Слоты {#slots}

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

<jsx-repl :files :apps prev="/tutorial/step-8/" next="/tutorial/step-10/">

Помимо передачи данных через пропсы, родительский компонент также может передавать JSX дочернему компоненту через слоты:

```jsx
<Comp>This is the default slot content!</Comp>
```

Есть три способа использования слотов:

1. Использовать слоты, передаваемые во втором параметре контекста функционального компонента.

```jsx
const Comp = (props, { slots }) => {
  return <>{slots.default ? <slots.default /> : 'Резервный контент'}</>
}
```

2. Использовать элемент `<slot>` в качестве точки вставки слота. Содержимое внутри элемента `<slot>` рассматривается как резервный контент: оно будет отображаться, если родительский компонент не передаст содержимое для этого слота.

```jsx
const Comp = (props, { slots }) => {
  return <slot>Резервный контент</slot>
}
```

> Именованный слот

```jsx
const Comp = (props, { slots }) => {
  return [
    <slot>Резервный контент</slot>,
    <slot name="title">Заголовок резервного контента</slot>,
  ]
}
```

3. Включить опцию `macros` и использовать макрос `defineSlots` для объявления слотов с резервным контентом.

```jsx
const Comp = (props) => {
  const slots = defineSlots({
    default: () => <>Резервный контент</>,
  })
  return <slots.default />
}
```

Сейчас мы не передаём компоненту `<Comp>` никакого содержимого для слота, поэтому отображается резервный контент. Попробуйте передать компоненту `Comp` содержимое слота, используя при этом состояние `msg` родительского компонента.

</jsx-repl>

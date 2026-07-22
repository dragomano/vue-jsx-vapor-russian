---
aside: false
prev: false
next: false
---

# Изолированные слоты {#scoped-slots}

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

<jsx-repl :files :apps prev="/tutorial/step-9/" next="/tutorial/step-11/">

Бывают случаи, когда содержимому слота полезно иметь доступ к данным как из области видимости родительского компонента, так и из области видимости дочернего. Этого можно добиться двумя способами:

1. Передать атрибуты элементу `<slots.default />` так же, как пропсы передаются компоненту.

```jsx
const Comp = (props, { slots }) => {
  return <slots.default foo="из дочернего компонента" />
}
```

2. Передать атрибуты точке вставки слота так же, как пропсы передаются компоненту:

```jsx
const Comp = () => {
  return <slot foo="из дочернего компонента"></slot>
}
```

## Использование изолированных слотов

Мы покажем, как получать пропсы через слоты. Это можно сделать четырьмя способами:

1. Использовать функциональное выражение внутри `<Comp>`:

```jsx
export default () => <Comp>{(slotProps) => <div>{slotProps.foo}</div>}</Comp>
```

2. Использовать объектное выражение внутри `<Comp>` для передачи нескольких слотов:

```jsx
export default () => (
  <Comp>
    {{
      default: (slotProps) => <div>{slotProps.foo}</div>,
      title: (slotProps) => <div>{slotProps.bar}</div>,
    }}
  </Comp>
)
```

::: warning
Обратите внимание, что выражения слотов рассматриваются как динамические слоты. Если вам важна максимальная производительность, используйте вместо них директиву `v-slot`.
:::

3. Использовать директиву `v-slot` в `<Comp>` для объявления нескольких слотов, так же как в шаблонах Vue:

```jsx
export default () => (
  <Comp v-slot={{ foo }}>
    <div>{foo}</div>
  </Comp>
)
```

4. Также можно использовать директиву `v-slot` в `<Comp>`, так же как в шаблонах Vue:

```jsx
export default () => (
  <Comp>
    <template v-slot={{ foo }}>
      <div>{foo}</div>
    </template>
    <template v-slot:title={{ foo }}>
      <div>{foo}</div>
    </template>
  </Comp>
)
```

Теперь попробуйте сами — отобразите проп слота `foo` в компоненте `<Comp>`.

</jsx-repl>

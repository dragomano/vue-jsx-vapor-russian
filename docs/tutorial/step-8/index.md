---
aside: false
prev: false
next: false
---

# Пропсы {#props}

<script setup>
import appCode from './app.tsx?raw'
import appSolvedCode from './app-solved.tsx?raw'
import appInteropCode from './app-interop.tsx?raw'
import appInteropSolvedCode from './app-interop-solved.tsx?raw'
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
  macros: { 'src/App.tsx': appCode },
  macrosSolved: { 'src/App.tsx': appMacrosSolvedCode },
  interopMacros: { 'src/App.tsx': appInteropMacrosCode },
  interopMacrosSolved: { 'src/App.tsx': appInteropMacrosSolvedCode },
}
</script>

<jsx-repl :files :apps prev="/tutorial/step-7" next="/tutorial/step-9">

Пропсы передаются в первый параметр функционального компонента.

```jsx
const Comp = (props) => (
  <div>{props.foo}</div>
)
```

## Деструктуризация пропсов

::: warning
В отличие от других JSX-фреймворков, при деструктуризации пропсов они теряют реактивность:
:::

```jsx
const Comp = ({ foo }) => (
  <div>
    значение {foo} больше не будет обновляться
  </div>
)
```

Есть два способа решить эту проблему:

1. Передавать в качестве пропа непосредственно реактивный объект `ref`:
```jsx
function Comp({ foo }) {
  return <div>{foo.value}</div>
}

export default () => {
  const foo = ref('foo')
  return <Comp foo={foo} />
}
```

Однако такой компонент нельзя использовать в шаблонах Vue, поскольку шаблоны Vue автоматически разворачивают (`unwrap`) объекты `ref`.

2. Включить опцию `macros` и обернуть компонент в `defineVaporComponent` или `defineComponent` (для Virtual DOM). Макрос автоматически заменит деструктурированные пропсы на `__props` и добавит префикс `__props.` ко всем используемым пропсам.

```jsx
const Comp = defineVaporComponent(({ foo }) => {
  return <div>{foo}</div>
})
```
Код выше будет преобразован в:
```jsx
const Comp = defineVaporComponent((__props) => {
  return <div>{__props.foo}</div>
})
```
После этого проп `foo` снова станет реактивным.\
[Подробнее](/features/macros.html#definecomponent-definevaporcomponent)

Теперь попробуйте сами — сделайте проп `foo` реактивным.

</jsx-repl>

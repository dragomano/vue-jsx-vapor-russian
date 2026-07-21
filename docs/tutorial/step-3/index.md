---
aside: false
prev: false
next: false
---

# Привязка атрибутов {#attribute-bindings}

<script setup>
import appCode from './app.tsx?raw'
import appSolvedCode from './app-solved.tsx?raw'
import appInteropCode from './app-interop.tsx?raw'
import appInteropSolvedCode from './app-interop-solved.tsx?raw'
import { getDefaultFiles } from '../template'
import { ref } from 'vue'

const files = ref(getDefaultFiles())
const apps  = {
  app: { 'src/App.tsx': appCode },
  solved: { 'src/App.tsx': appSolvedCode },
  interop: { 'src/App.tsx': appInteropCode },
  interopSolved: { 'src/App.tsx': appInteropSolvedCode }
}
</script>

<jsx-repl :files :apps prev="/tutorial/step-2/" next="/tutorial/step-4/">

Для динамической привязки конкретного пропа используется выражение `{ }`, а для привязки сразу нескольких атрибутов — оператор расширения `{...}`:
```jsx
export default (props) => (
  <>
    <div id={props.id} />
    {/* несколько привязок */}
    <div {...props} />
  </>
)
````

## Привязка стилей
Для условной привязки стилей можно использовать строку, объект или массив.
```tsx
export default (props: { hidden: boolean }) => (
  <>
    <h1 style={`display: ${ props.hidden ? 'none' : 'block' }`}>h1</h1>
    <h2 style={{ display: props.hidden ? 'none': undefined }}>h2</h2>
    <h3 style={[ props.hidden && 'display: none;' ]}>h3</h3>
  </>
)
```

## Привязка классов
Для условной привязки классов можно использовать строку, объект или массив.

```tsx
export default (props: { hidden: boolean }) => (
  <>
    <h1 class={props.hidden && 'hidden'}>h1</h1>
    <h2 class={{ 'hidden': props.hidden }}>h2</h2>
    <h3 class={[ props.hidden && 'hidden' ]}>h3</h3>
  </>
)
```

Теперь попробуйте добавить к элементу `<h1>` динамическую привязку `class`, используя в качестве значения переменную `titleClass`. Если привязка выполнена правильно, текст станет красным.

</jsx-repl>

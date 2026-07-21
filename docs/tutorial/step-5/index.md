---
aside: false
prev: false
next: false
---

# Отрисовка по условию {#conditional-rendering}

<script setup>
import appCode from './app.tsx?raw'
import appSolvedCode from './app-solved.tsx?raw'
import appInteropCode from './app-interop.tsx?raw'
import appInteropSolvedCode from './app-interop-solved.tsx?raw'
import appMacrosSolvedCode from './app-macros-solved.tsx?raw'
import appInteropMacrosSolvedCode from './app-interop-macros-solved.tsx?raw'
import { getDefaultFiles } from '../template'
import { ref } from 'vue'

const files = ref(getDefaultFiles())
const apps  = {
  app: { 'src/App.tsx': appCode },
  solved: { 'src/App.tsx': appSolvedCode },
  interop: { 'src/App.tsx': appInteropCode },
  interopSolved: { 'src/App.tsx': appInteropSolvedCode },
  macros: { 'src/App.tsx': appCode },
  macrosSolved: { 'src/App.tsx': appMacrosSolvedCode },
  interopMacros: { 'src/App.tsx': appInteropCode },
  interopMacrosSolved: { 'src/App.tsx': appInteropMacrosSolvedCode}
}
</script>

<jsx-repl :files :apps prev="/tutorial/step-4/" next="/tutorial/step-6/">

Для управления отображением можно использовать тернарный оператор `{ a ? b : c }` или логические выражения `{ a && b }`.

```jsx
<>
  { toggle ? <h1>Заголовок</h1> : null }
  { toggle && <h1>Заголовок</h1> }
</>
```

## Директивы `v-if` / `v-else-if` / `v-else`

Для условного отображения элемента также можно использовать директиву `v-if`:

```jsx
<>
  <h1 v-if={level === 1}>Заголовок</h1>
  <h2 v-else-if={level === 2}>Подзаголовок</h2>
  <div v-else>Контент</div>
</>
```

Сейчас в демонстрации одновременно отображаются оба элемента `<h1>`. Сделайте так, чтобы на странице отображался только один из них.

</jsx-repl>

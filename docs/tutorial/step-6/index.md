---
aside: false
prev: false
next: false
---

# Отрисовка списков {#list-rendering}

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

<jsx-repl :files :apps prev="/tutorial/step-5/" next="/tutorial/step-7">

Если производительность не является критичной, для отображения списка можно использовать `map(...)`.

```jsx
<ul>
  {todos.map((todo) => {
    return <li key={todo.id}>{todo.text}</li>
  })}
</ul>
```

## Директива `v-for`

Для отображения списка также можно использовать директиву `v-for`, которая обеспечивает такую же производительность, как и шаблоны Vue.

```jsx
<ul>
  <li v-for={todo in todos} key={todo.id}>
    {todo.text}
  </li>
</ul>
```

Здесь `todo` — это локальная переменная, представляющая текущий элемент массива, по которому выполняется итерация. Она доступна только для элемента с директивой `v-for` и его содержимого, подобно переменной в области видимости функции.

Обратите внимание, что каждому объекту `todo` также присваивается уникальный идентификатор, который привязывается к специальному атрибуту `key` каждого элемента `<li>`. Атрибут `key` позволяет Vue правильно сопоставлять и перемещать элементы `<li>` в соответствии с положением соответствующих объектов в массиве.

Сейчас у нас есть простой список дел, в котором отображается только один элемент. Попробуйте вывести все элементы списка, чтобы всё работало правильно!

</jsx-repl>

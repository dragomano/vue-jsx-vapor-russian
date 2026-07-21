---
aside: false
prev: false
next: false
---

# Привязка событий {#event-bindings}

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

<jsx-repl :files :apps prev="/tutorial/step-3/" next="/tutorial/step-5/">

В JSX обработчики событий обычно записываются с префиксом `on`, за которым следует имя события с заглавной буквы. Также для привязки нескольких обработчиков событий без префикса `on` можно использовать директиву `v-on`.

```tsx
<>
  <div onClick={onClick} />
  {/* несколько привязок */}
  <form v-on={{ click: onClick, submit: onSubmit }}></form>
</>
```

Также поддерживаются [модификаторы событий](https://vuejs.dragomano.ru/guide/essentials/event-handling.html#event-modifiers), которые начинаются с символа `_`:
```tsx
<form onSubmit_prevent>
  <input onKeyup_enter={submit} />
</form>
```

Теперь попробуйте добавить к элементу `<h1>` обработчик события `onClick`, используя в качестве значения переменную `onClick`, а затем нажмите на `<h1>`.

</jsx-repl>

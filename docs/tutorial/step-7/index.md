---
aside: false
prev: false
next: false
---

# Компоненты {#components}

<script setup>
import appCode from './app.tsx?raw'
import appSolvedCode from './app-solved.tsx?raw'
import appInteropCode from './app-interop.tsx?raw'
import appInteropSolvedCode from './app-interop-solved.tsx?raw'
import childCode from './Child.tsx?raw'
import { getDefaultFiles } from '../template'
import { ref } from 'vue'

const files = ref({
  ...getDefaultFiles(),
  'src/Child.tsx': childCode
})
const apps  = {
  app: { 'src/App.tsx': appCode },
  solved: { 'src/App.tsx': appSolvedCode,  },
  interop: { 'src/App.tsx': appInteropCode },
  interopSolved: { 'src/App.tsx': appInteropSolvedCode }
}
</script>

<jsx-repl :files :apps prev="/tutorial/step-6/" next="/tutorial/step-8/">

В этом примере давайте добавим компонент `Child` в наше приложение. Он определён в отдельном файле, хотя вы можете размещать несколько компонентов и в одном файле. Сначала его нужно импортировать:

```jsx
import Child from './Child'
```

После этого компонент можно использовать в JSX следующим образом:
```jsx
import Child from './Child'

export default () => {
  return (
    <div>
      Родительский компонент
      <Child />
    </div>
  )
}
```

Теперь попробуйте сами: импортируйте компонент `Child` и отобразите его в JSX.

</jsx-repl>

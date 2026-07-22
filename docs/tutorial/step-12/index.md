---
aside: false
prev: false
next: false
---

# Двусторонняя привязка {#two-way-binding}

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

<jsx-repl :files :apps prev="/tutorial/step-11/" next="/tutorial/step-13/">

Двусторонняя привязка позволяет родительскому компоненту не только передавать данные дочернему, но и получать от него обновления. В Vue JSX для этого используется директива `v-model`.

## Без `v-model`

Без `v-model` необходимо вручную передать `modelValue` через проп и подписаться на событие `onUpdate:modelValue`:

```jsx
<Comp modelValue={msg.value} onUpdate:modelValue={(v) => (msg.value = v)} />
```

Дочерний компонент получает `modelValue` через проп и генерирует событие `onUpdate:modelValue`, чтобы уведомить родительский компонент об изменениях:

```jsx
const Comp = (props) => {
  return (
    <input
      value={props.modelValue}
      onInput={(e) => props['onUpdate:modelValue'](e.target.value)}
    />
  )
}
```

## Использование `v-model`

`v-model` — это синтаксический сахар для описанного выше шаблона. Он автоматически связывает `modelValue` и `onUpdate:modelValue`:

```jsx
<Comp v-model={msg.value} />
```

## Именованная `v-model`

Также можно использовать именованная `v-model` для привязки нескольких значений:

```jsx
<Comp v-model:title={title.value} v-model:content={content.value} />
```

Дочерний компонент получает их как отдельные пропсы:

```jsx
const Comp = (props) => {
  return (
    <>
      <input
        value={props.title}
        onInput={(e) => props['onUpdate:title'](e.target.value)}
      />
      <input
        value={props.content}
        onInput={(e) => props['onUpdate:content'](e.target.value)}
      />
    </>
  )
}
```

## Использование макроса `defineModel`

Если включена опция `macros`, внутри дочернего компонента можно использовать макрос `defineModel`, чтобы упростить двустороннюю привязку. Он возвращает доступный для записи `ref`, который автоматически синхронизируется с родительским компонентом:

```jsx
const Comp = () => {
  const model = defineModel()
  return (
    <input
      value={model.value}
      onInput={(e) => (model.value = e.target.value)}
    />
  )
}
```

Для именованных моделей передайте имя модели первым аргументом:

```jsx
const Comp = () => {
  const title = defineModel('title')
  const content = defineModel('content')
  return (
    <>
      <input
        value={title.value}
        onInput={(e) => (title.value = e.target.value)}
      />
      <input
        value={content.value}
        onInput={(e) => (content.value = e.target.value)}
      />
    </>
  )
}
```

Теперь попробуйте сами — замените ручную привязку `modelValue` + `onUpdate:modelValue` на `v-model`.

</jsx-repl>

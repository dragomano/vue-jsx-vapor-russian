---
aside: false
prev: false
next: false
---

# Динамический компонент {#dynamic-component}

<script setup>
import appCode from './app.tsx?raw'
import appSolvedCode from './app-solved.tsx?raw'
import appInteropCode from './app-interop.tsx?raw'
import { getDefaultFiles } from '../template'
import { ref } from 'vue'

const files = ref(getDefaultFiles())
const apps = {
  app: { 'src/App.tsx': appCode },
  solved: { 'src/App.tsx': appSolvedCode },
  interop: { 'src/App.tsx': appInteropCode },
  interopSolved: { 'src/App.tsx': appInteropCode },
}
</script>

<jsx-repl :files :apps prev="/tutorial/step-12/" next="/tutorial/step-14/">

Иногда компонент, который нужно отобразить, заранее неизвестен. В таком случае его можно сохранить в переменной и динамически переключать.

## Использование

Динамический компонент можно отобразить, вычислив ссылку на компонент внутри контейнера выражения:

```jsx
import { shallowRef } from 'vue'

const Foo = () => <div>Foo</div>
const Bar = () => <div>Bar</div>

export default () => {
  const DynamicComponent = shallowRef(Foo)
  return <>{<DynamicComponent.value />}</>
}
```

## Зачем использовать контейнер выражения?

В компонентах Vapor выражение `<DynamicComponent.value />` само по себе воспринимается как обычный JSX-тег компонента. Ключевой момент заключается в том, чтобы обернуть его в `{}`, превратив в контейнер выражения JSX. Это позволяет компилятору распознать его как выражение динамического компонента.

> В компонентах Virtual DOM его можно использовать напрямую, без `{}`.

```jsx
<>{<DynamicComponent.value />}</>
```

## Переключение между компонентами

Распространённый подход — хранить текущий компонент в `shallowRef` и переключать его в ответ на действия пользователя:

```jsx
const DynamicComponent = shallowRef(Foo)

const toggle = () => {
  DynamicComponent.value = DynamicComponent.value === Foo ? Bar : Foo
}
```

Теперь попробуйте сами — реализуйте переключение между `Foo` и `Bar`, динамически отображая текущий компонент.

</jsx-repl>

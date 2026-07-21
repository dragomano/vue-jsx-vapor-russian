---
aside: false
prev: false
next: false
---

# Введение в JSX {#introducing-jsx}

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

<jsx-repl :files :apps prev="/tutorial/step-1/" next="/tutorial/step-3/">

JSX — это синтаксис, похожий на HTML, который позволяет встраивать динамические выражения с помощью `{ }` для обращения к переменным и функциям.
В этом примере мы вставляем строку `name` в JSX с помощью выражения `{name}` внутри элемента `div`, а также отображаем JSX-элемент, который был напрямую присвоен переменной `a`.

Существует четыре основных отличия JSX от HTML:

1. В JSX все элементы должны быть закрыты. Поэтому даже пустые HTML-элементы, такие как `input` и `br`, должны быть самозакрывающимися (например, `<input />`, `<br />`).

2. Имена компонентов в JSX должны использовать стиль PascalCase (например, `<MyComp />`) вместо kebab-case (`<my-comp />`). Имена пропсов также должны использовать camelCase (например, `fooBar`) вместо kebab-case (`foo-bar`).

3. В JSX обычно требуется один корневой элемент. Чтобы представить несколько элементов верхнего уровня, оберните их специальными тегами (`<>...</>`) или используйте компонент Fragment с пропсами (`<Fragment key={key}>...</Fragment>`).

```jsx
<>
  <h1>Заголовок</h1>
  <h2>Подзаголовок</h2>
</>
```

4. JSX не поддерживает HTML-комментарии `<!--...-->` и специальные теги, такие как `<!DOCTYPE>`. Вместо этого используйте комментарии JSX: `{/*...*/}` — они не будут включены в итоговый HTML.

Теперь попробуйте использовать переменную `name` в JSX и измените значение переменной `a` на `<a href="#">link</a>`.

</jsx-repl>

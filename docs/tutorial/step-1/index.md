---
aside: false
prev: false
next: false
---

# Первые шаги {#getting-started}

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

<jsx-repl :files :apps next="/tutorial/step-2/">

Добро пожаловать в учебник по Vue JSX Vapor!

Цель этого учебника — быстро познакомить вас с процессом работы с Vue JSX Vapor прямо в браузере.

## Что такое Vue JSX Vapor?
Vue JSX Vapor — это `компилятор Vue JSX`, вдохновлённый `компилятором Vue`, написанный на Rust 🦀 и использующий Oxc. Он поддерживает генерацию кода для Virtual DOM и Vapor Mode.

## Как пользоваться этим учебником
Вы можете редактировать приведённый ниже код и сразу видеть обновлённый результат. На каждом шаге будет представлена ключевая возможность Vue JSX, а вам нужно будет завершить код, чтобы демонстрация заработала. Если вы столкнётесь с трудностями, у вас будет кнопка «Решить», которая покажет рабочий вариант кода.

</jsx-repl>

---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vue JSX Vapor"
  text: "Типобезопасность, удобство, скорость"
  tagline: Vue JSX с поддержкой Vapor Mode
  image:
    src: /logo.svg
    alt: Vue JSX Vapor
  actions:
    - theme: brand
      text: Начать
      link: /introduction/getting-started
    - theme: alt
      text: Практикум
      link: /tutorial/step-1

features:
  - icon: ⚒️
    title: Директивы
    details: Полная поддержка всех встроенных директив Vue в синтаксисе JSX.
  - icon: ✨
    title: Макросы
    details: Поддерживает большинство макросов Vue, оптимизированных для JSX.
  - icon: 🦾
    title: Типобезопасность
    details: Поддержка плагина Volar через установку TS Macro (плагина для VSCode).
  - icon: ⚡️
    title: Высокая производительность
    details: Обеспечивает такую же производительность, как и Vue Vapor!
  - icon: 🦀
    title: Компилятор на Rust
    details: Работает на базе Oxc; в 35 раз быстрее Babel (Virtual DOM) и в 50 раз быстрее (Vapor).
  - icon: ⚙️
    title: Интеграция с ESLint
    details: Включает плагин ESLint для автоматического форматирования директив и макросов.
---

## Производительность компилятора {#compiler-benchmark}
<script setup>
import PerformanceChart from './.vitepress/theme/components/PerformanceChart.vue'
</script>

<ClientOnly>
  <PerformanceChart />
</ClientOnly>

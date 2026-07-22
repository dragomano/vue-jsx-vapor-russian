---
aside: false
prev: false
next: false
---

# Вы сделали это! {#you-did-it}

<script setup>
import appCode from './app.tsx?raw'
import { getDefaultFiles } from '../template'
import { ref } from 'vue'

const files = ref(getDefaultFiles())
const apps  = {
  app: { 'src/App.tsx': appCode },
}
</script>

<jsx-repl :files :apps prev="/tutorial/step-11/">

Поздравляем, вы завершили обучение!

Теперь у вас должно сложиться хорошее представление о том, как работать с Vue JSX Vapor. Однако мы рассмотрели множество возможностей в очень быстром темпе и не углублялись в детали, поэтому рекомендуем продолжить изучение. В качестве следующего шага вы можете:

- Создать полноценный проект Vue JSX Vapor на своём компьютере, используя шаблон [vitesse-jsx-vapor](https://github.com/zhiyuanzmj/vitesse-jsx-vapor).

- Создать полноценный SSR-проект на своём компьютере, используя шаблон [vue-jsx-vapor-ssr](https://github.com/zhiyuanzmj/vue-jsx-vapor-ssr).

</jsx-repl>

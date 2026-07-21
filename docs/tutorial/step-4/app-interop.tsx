import { defineComponent } from 'vue'

export default defineComponent(() => {
  function onClick() {
    alert('Нажато')
  }
  return () => <h1>Нажми на меня!</h1>
})

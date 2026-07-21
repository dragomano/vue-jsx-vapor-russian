import { defineComponent } from 'vue'

export default defineComponent(() => {
  function onClick() {
    alert('Нажато')
  }
  return () => <h1 onClick={onClick}>Нажми на меня!</h1>
})

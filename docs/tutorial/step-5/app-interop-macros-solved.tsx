import { defineComponent, ref } from 'vue'

export default defineComponent(() => {
  const toggle = ref(true)
  return () => (
    <>
      <button
        onClick={() => {
          toggle.value = !toggle.value
        }}
      >
        Переключить
      </button>

      <h1 v-if={toggle.value}>true</h1>
      <h1 v-else>false</h1>
    </>
  )
})

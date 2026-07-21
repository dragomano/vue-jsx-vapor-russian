import { defineComponent } from 'vue'

export default defineComponent(() => {
  const titleClass = 'title'
  return () => (
    <>
      <h1 class={titleClass}>Заставь меня покраснеть</h1>

      <style>{`
        .title {
          color: red;
        }
      `}</style>
    </>
  )
})

import { defineComponent } from 'vue'

export default defineComponent(() => {
  const name = 'Vue JSX'
  return () => {
    const a = undefined // Замените на элемент <a>
    return (
      <>
        <div>Привет, {/* Используйте здесь переменную name */}!</div>
        {a}
      </>
    )
  }
})

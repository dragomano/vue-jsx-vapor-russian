import { defineComponent } from 'vue'

export default defineComponent(() => {
  const name = 'Vue JSX'
  return () => {
    const a = <a href="#">ссылка</a>
    return (
      <>
        <div>Привет, {name}!</div>
        {a}
      </>
    )
  }
})

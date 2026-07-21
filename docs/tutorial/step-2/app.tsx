export default () => {
  const name = 'Vue JSX'
  const a = undefined // Замените на элемент <a>
  return (
    <>
      <div>Привет, {/* Используйте здесь переменную name */}!</div>
      {a}
    </>
  )
}

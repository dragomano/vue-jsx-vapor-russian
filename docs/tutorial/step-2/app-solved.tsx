export default () => {
  const name = 'Vue JSX'
  const a = <a href="#">ссылка</a>
  return (
    <>
      <div>Привет, {name}!</div>
      {a}
    </>
  )
}

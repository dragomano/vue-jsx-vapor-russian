const Comp = () => {
  const slots = defineSlots({
    default: (props: { foo: string }) => <></>,
  })
  return <slots.default foo="из дочернего компонента" />
}

export default () => {
  return (
    <Comp v-slot={{ foo }}>
      <div>{foo}</div>
    </Comp>
  )
}

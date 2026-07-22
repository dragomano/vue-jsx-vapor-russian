const Comp = (props, { slots }) => {
  return <slots.default foo="из дочернего компонента" />
}

export default () => {
  return <Comp>{(slotProps) => <div>{slotProps.foo}</div>}</Comp>
}

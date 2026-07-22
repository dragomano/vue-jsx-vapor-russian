const Comp = (props, { slots }) => {
  return <slots.default foo="из дочернего компонента" />
}

export default () => {
  return <Comp>{() => <div>{/* ... */}</div>}</Comp>
}

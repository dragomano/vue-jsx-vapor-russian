import { ref } from 'vue'

const Comp = (props, { slots }) => {
  return <>{slots.default ? <slots.default /> : 'Резервный контент'}</>
}

export default () => {
  const msg = ref('из родительского компонента')
  return <Comp>{/* ... */}</Comp>
}

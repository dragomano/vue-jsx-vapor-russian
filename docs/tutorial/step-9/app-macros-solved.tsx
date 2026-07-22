import { ref } from 'vue'

const Comp = () => {
  const slots = defineSlots({
    default: () => <>Резервный контент</>,
  })
  return <slots.default />
}

export default () => {
  const msg = ref('из родительского компонента')
  return <Comp>{msg.value}</Comp>
}

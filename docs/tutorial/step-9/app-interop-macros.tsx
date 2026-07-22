import { defineComponent, ref } from 'vue'

const Comp = defineComponent(() => {
  const slots = defineSlots({
    default: () => <>Резервный контент</>,
  })
  return () => <slots.default />
})

export default defineComponent(() => {
  const msg = ref('из родительского компонента')
  return () => <Comp>{/* ... */}</Comp>
})

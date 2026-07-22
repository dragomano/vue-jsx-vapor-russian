import { defineComponent, ref } from 'vue'

const Comp = defineComponent((props, { slots }) => {
  return () => <>{slots.default ? <slots.default /> : 'Резервный контент'}</>
})

export default defineComponent(() => {
  const msg = ref('из родительского компонента')
  return () => <Comp>{msg.value}</Comp>
})

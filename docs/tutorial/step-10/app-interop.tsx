import { defineComponent } from 'vue'

const Comp = defineComponent((props, { slots }) => {
  return () => <slots.default foo="из дочернего компонента" />
})

export default defineComponent(() => {
  return () => <Comp>{() => <div>{/* ... */}</div>}</Comp>
})

import { defineComponent } from 'vue'

const Comp = defineComponent(() => {
  const slots = defineSlots({
    default: (props: { foo: string }) => <></>,
  })
  return () => <slots.default foo="из дочернего компонента" />
})

export default defineComponent(() => {
  return () => (
    <Comp v-slot={{ foo }}>
      <div>{foo}</div>
    </Comp>
  )
})

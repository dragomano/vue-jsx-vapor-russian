# useRef

Утилитарная функция, которая обеспечивает автоматический вывод типов для ссылок на компоненты. Она является псевдонимом для `shallowRef`.

## Использование {#basic-usage}

```tsx twoslash
import { defineVaporComponent } from 'vue'
import { useRef } from 'vue-jsx-vapor'
// или
// import { shallowRef as useRef } from 'vue'

export const Comp = () => {
  defineExpose({
    foo: 1
  })

  return <div />
}

export default defineVaporComponent(() => {
  const comp = useRef()
  comp.value?.foo
  //           ^?

  return (
    <div>
      <Comp ref={comp} />
    </div>
  )
})
```

# Руководство по миграции {#migration-guide}

## Миграция с `vue-jsx` {#migrating-from-vue-jsx}

### Основные отличия {#key-differences}

1. **Определение компонентов**: Для компонентов Vapor используйте `defineVaporComponent` вместо `defineComponent`. В отличие от `defineComponent`, функция `setup` в `defineVaporComponent` возвращает непосредственно JSX, а не функцию рендеринга.

2. **Соглашения об именовании**: Имена пропсов и компонентов, записанные через дефис, не преобразуются автоматически в camelCase. Используйте camelCase во всей кодовой базе.

3. **Синтаксис `v-model`**: Выражения-массивы не поддерживаются в `v-model`. Вместо этого используйте явный синтаксис модификаторов:

   ```tsx
   <>
     {/* ❌ Не поддерживается */}
     <input v-model={[foo, ['trim']]} />

     {/* ✅ Используйте такой вариант */}
     <input v-model:$name$_trim={foo} />
   </>
   ```

4. **Директива `v-models`**: Директива `v-models` не поддерживается. Вместо неё объявляйте каждую привязку `v-model` отдельно.

5. **Деструктуризация пропсов**:

> [!CAUTION]
> Деструктуризация пропсов в функциональном компоненте нарушает реактивность, поскольку после деструктуризации значения становятся статическими снимками.

```tsx
function Comp({ foo }) {
  return <div>{foo}</div>
}

export default () => {
  const foo = ref('foo')
  return <Comp foo={foo.value} />
}
```

#### Решения {#solutions}

**Вариант 1:** Передавайте сам `ref`, а не его значение:

```tsx
function Comp({ foo }) {
  return <div>{foo.value}</div>
}

export default () => {
  const foo = ref('foo')
  return <Comp foo={foo} />
}
```

**Вариант 2:** Включите макросы и оберните компонент в `defineVaporComponent`:

- Конфигурация

  ```ts {7}
  // vite.config.ts
  import vueJsxVapor from 'vue-jsx-vapor/vite'

  export default defineConfig({
    plugins: [
      vueJsxVapor({
        macros: true,
      }),
    ],
  })
  ```

- Использование

  ```tsx
  import { defineVaporComponent, ref } from 'vue'

  const Comp = defineVaporComponent(({ foo }) => {
    return <>{foo}</>
  })
  // Компилируется в:
  const Comp = defineVaporComponent(
    (_props) => {
      return <>{_props.foo}</>
    },
    { props: ['foo'] },
  )

  export default () => {
    const foo = ref('foo')
    return <Comp foo={foo.value} />
  }
  ```

## Миграция с React {#migrating-from-react}

Для автоматической миграции рекомендуется использовать [eslint-plugin-react2vue](https://github.com/zhiyuanzmj/eslint-plugin-react2vue), который преобразует React Hooks API в эквиваленты Vue Composition API.

### `useState` → `ref`

```ts
// React
const [foo, setFoo] = useState(count)
console.log([foo, setFoo(1), setFoo])

// Vue
const foo = ref(0)
console.log([foo.value, (foo.value = 1), (val) => (foo.value = val)])
```

### `useEffect` → `watchEffect`

```ts
// React
useEffect(() => {
  console.log(foo)
}, [foo])

// Vue
watchEffect(() => {
  console.log(foo)
})
```

### `useMemo` → `computed`

```ts
// React
const double = useMemo(() => foo * 2, [foo])
console.log({ double }, [double])

// Vue
const double = computed(() => foo * 2)
console.log({ double: double.value }, [double.value])
```

### Функциональные компоненты → `defineVaporComponent` {#functional-components-→-definevaporcomponent}

Макрос `defineVaporComponent` позволяет выполнять деструктуризацию `props` с сохранением полной реактивности:

```tsx
// React
const Comp = ({ count = 1 }) => {
  return <div>{count}</div>
}

// Vue
const Comp = defineVaporComponent(({ count = 1 }) => {
  return <div>{count}</div>
})
```

### `children` → `defineSlots`

Замените использование свойства `children` на систему слотов Vue:

```tsx
// React
const Comp = ({ children }) => {
  return children
}

// Vue
const Comp = () => {
  const slots = defineSlots()
  return <slots.default />
}
```

### `useCallback`

Система реактивности Vue устраняет необходимость в `useCallback`. Просто объявляйте функции напрямую:

```ts
// React
const callback = useCallback(() => {
  console.log(foo)
}, [foo])

// Vue
const callback = () => {
  console.log(foo)
}
```

### `forwardRef`

Vue автоматически обрабатывает передачу `ref`. Удалите обёртку `forwardRef`:

```tsx
// React
const Comp = forwardRef(({ count }, ref) => {
  return <div>{count}</div>
})

// Vue
const Comp = ({ count }) => {
  return <div>{count}</div>
}
```

### `useImperativeHandle` → `defineExpose`

```tsx
// React
const Comp = ({ count, ref }) => {
  useImperativeHandle(ref, () => {
    return {
      count: count * 2,
    }
  }, [count])
  return <div>{count}</div>
}

// Vue
const Comp = ({ count }) => {
  defineExpose(
    computed(() => {
      return {
        count: count * 2,
      }
    }),
  )
  return <div>{count}</div>
}
```

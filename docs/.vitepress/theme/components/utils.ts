import { computed, ref, onMounted, type Ref } from 'vue'

export function useRouteQuery<T extends string | boolean>(
  name: string,
  defaultValue?: T,
  reload = false,
) {
  const value = ref(defaultValue)

  const initFromUrl = () => {
    if (typeof window === 'undefined') return

    const searchParams = new URLSearchParams(window.location.search)
    const data = searchParams.get(name) || localStorage.getItem(name)

    if (data !== null) {
      value.value = (data === 'true' ? true : data === 'false' ? false : data) as T
    }
  }

  if (typeof window !== 'undefined') {
    initFromUrl()
  } else {
    value.value = defaultValue
  }

  return computed({
    get() {
      return value.value === 'true'
        ? true
        : value.value === 'false'
          ? false
          : value.value
    },
    set(v) {
      const searchParams = new URLSearchParams(location.search)
      if (v === defaultValue) {
        searchParams.delete(name)
      } else {
        searchParams.set(name.toString(), v as string)
      }
      const url = `${location.pathname}${searchParams.size ? '?' : ''}${searchParams.toString()}`
      if (reload) location.replace(url)
      else history.replaceState({}, '', url + location.hash)
      localStorage.setItem(name, v)
      value.value = v
    },
  }) as unknown as Ref<T>
}

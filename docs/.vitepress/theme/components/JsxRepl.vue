<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref, watch, type PropType } from 'vue'
import { withBase } from 'vitepress'
import ReplOptions from './ReplOptions.vue'
import { useRouteQuery } from './utils'

const props = defineProps({
  files: {
    type: Object,
    required: true,
  },
  apps: {
    type: Object as PropType<{
      app: object
      solved?: object
      interop?: object
      interopSolved?: object
      macros?: object
      macrosSolved?: object
      interopMacros?: object
      interopMacrosSolved?: object
    }>,
    required: true,
  },
  prev: String,
  next: String,
})

const prevHref = computed(() => props.prev ? withBase(props.prev) : undefined)
const nextHref = computed(() => props.next ? withBase(props.next) : undefined)

const solved = ref(false)
const macros = useRouteQuery<boolean>('macros', false)
const interop = useRouteQuery<boolean>('interop', false)

watch(
  () => [interop.value, macros.value, solved.value],
  () => {
    setApp()
  },
  { immediate: true },
)

function setApp() {
  const isInterop = interop.value && !!props.apps.interop
  const isMacros = macros.value && !!props.apps.macros
  Object.assign(
    props.files,
    props.apps[
      isInterop
        ? solved.value
          ? isMacros
            ? 'interopMacrosSolved'
            : 'interopSolved'
          : isMacros
            ? 'interopMacros'
            : 'interop'
        : solved.value
          ? isMacros
            ? 'macrosSolved'
            : 'solved'
          : isMacros
            ? 'macros'
            : 'app'
    ],
  )
}

const layout = ref('vertical')

onMounted(() => {
  const mql = globalThis.matchMedia('(max-width: 960px)')
  const updateLayout = () => {
    layout.value = mql.matches ? 'horizontal' : 'vertical'
  }
  updateLayout()
  mql.addEventListener('change', updateLayout)
})

const Repl = defineAsyncComponent({
  loader: () => import('./Repl.vue'),
})
</script>

<template>
  <div
    class="repl-container"
    :style="{ 'flex-direction': layout === 'vertical' ? 'row' : 'column' }"
  >
    <div class="repl-left">
      <div class="repl-content">
        <slot foo="foo" />
      </div>
      <div class="repl-bottom">
        <a v-show="prev" :href="prevHref">← Назад</a>
        <a v-show="next" :href="nextHref" style="margin-left: auto">Далее →</a>
      </div>
    </div>
    <div class="repl-right">
      <ReplOptions
        v-if="apps.solved"
        v-model:interop="interop"
        v-model:solved="solved"
        v-model:macros="macros"
        :files
        :apps
      />
      <ClientOnly>
        <Repl :files :layout />
      </ClientOnly>
    </div>
  </div>
</template>

<style>
.repl-container {
  display: flex;
  gap: 12px;
  height: calc(100vh - 132px - 48px);
}
@media (min-width: 1280px) {
  .repl-container {
    height: calc(100vh - 132px);
  }
}

.repl-left {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.repl-right {
  flex: 1;
  overflow: hidden;
  margin-top: -34px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  z-index: 1;
}

.repl-content {
  flex: 1;
  overflow: auto;
}

.repl-bottom {
  display: flex;
  align-items: center;
  margin-top: auto;
  margin-bottom: 34px;
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-gray-1);
  a {
    text-decoration: unset;
  }
}
</style>

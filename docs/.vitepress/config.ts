import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { createTwoslasher } from '@ts-macro/twoslash'
import { defineConfig } from 'vitepress'
import vueJsxVapor from 'vue-jsx-vapor/volar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue JSX Vapor',
  description: 'Vue JSX Vapor',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  base: '/vue-jsx-vapor-russian/',
  locales: {
    root: {
      label: 'Русский',
      lang: 'ru',
    },
    en: { label: 'English', link: 'https://vuejsx.dev/' },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: 'Главная', link: '/' },
      {
        text: 'Возможности',
        link: '/features/directives',
        activeMatch: 'features',
      },
      { text: 'Практикум', link: '/tutorial/step-1', activeMatch: 'tutorial' },
      { text: 'Песочница', link: 'https://repl.zmjs.dev/vuejs/vue-jsx-vapor' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Поиск',
            buttonAriaLabel: 'Поиск'
          },
          modal: {
            displayDetails: 'Показать подробный список',
            resetButtonTitle: 'Сбросить поиск',
            backButtonTitle: 'Закрыть поиск',
            noResultsText: 'Нет результатов',
            footer: {
              selectText: 'Выбрать',
              selectKeyAriaLabel: 'Enter',
              navigateText: 'Навигация',
              navigateUpKeyAriaLabel: 'Стрелка вверх',
              navigateDownKeyAriaLabel: 'Стрелка вниз',
              closeText: 'Закрыть',
              closeKeyAriaLabel: 'Esc'
            }
          }
        }
      }
    },

    outline: { label: 'Содержание страницы' },

    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },

    lastUpdated: {
      text: 'Обновлено'
    },

    notFound: {
      title: 'СТРАНИЦА НЕ НАЙДЕНА',
      quote:
        'Но если ты не изменишь направление и продолжишь искать, ты можешь оказаться там, куда направляешься.',
      linkLabel: 'перейти на главную',
      linkText: 'Отведи меня домой'
    },

    darkModeSwitchLabel: 'Оформление',
    lightModeSwitchTitle: 'Переключить на светлую тему',
    darkModeSwitchTitle: 'Переключить на тёмную тему',
    sidebarMenuLabel: 'Меню',
    returnToTopLabel: 'Вернуться к началу',
    langMenuLabel: 'Изменить язык',
    skipToContentLabel: 'Перейти к содержимому',

    sidebar: {
      '/': [
        {
          text: 'Введение',
          items: [
            {
              text: 'Начало работы',
              link: '/introduction/getting-started',
            },
            {
              text: 'Совместимость',
              link: '/introduction/interop',
            },
            {
              text: 'Миграция',
              link: '/introduction/migration',
            },
            {
              text: 'ESLint',
              link: '/introduction/eslint',
            },
          ],
        },
        {
          text: 'Возможности',
          items: [
            {
              text: 'Директивы',
              link: '/features/directives',
            },
            {
              text: 'Макросы',
              link: '/features/macros',
            },
            {
              text: 'useRef',
              link: '/features/use-ref',
            },
          ],
        },
      ],
      '/tutorial/': [
        {
          text: 'Базовый курс',
          items: [
            { text: '1. Getting Started', link: '/tutorial/step-1/' },
            { text: '2. Введение в JSX', link: '/tutorial/step-2/' },
            { text: '3. Привязка атрибутов', link: '/tutorial/step-3/' },
            { text: '4. Привязка событий', link: '/tutorial/step-4/' },
            { text: '5. Отрисовка по условию', link: '/tutorial/step-5/' },
            { text: '6. Отрисовка списков', link: '/tutorial/step-6/' },
            { text: '7. Компоненты', link: '/tutorial/step-7/' },
            { text: '8. Пропсы', link: '/tutorial/step-8/' },
            { text: '9. Слоты', link: '/tutorial/step-9/' },
            { text: '10. Изолированные слоты', link: '/tutorial/step-10/' },
            { text: '11. Публикация состояния', link: '/tutorial/step-11/' },
          ],
        },
        {
          text: 'Продвинутый курс',
          items: [
            { text: '12. Двусторонняя привязка', link: '/tutorial/step-12/' },
            { text: '13. Динамический компонент', link: '/tutorial/step-13/' },
            { text: '14. HyperScript', link: '/tutorial/step-14/' },
          ],
        },
        { text: 'Вы сделали это!', link: '/tutorial/step-done/' },
      ],
    },

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/hMnyhpJH' },
      { icon: 'github', link: 'https://github.com/vuejs/vue-jsx-vapor' },
    ],
  },
  markdown: {
    languages: ['js', 'ts', 'tsx'],
    codeTransformers: [
      transformerTwoslash({
        twoslasher: createTwoslasher({
          compilerOptions: {
            jsx: 1,
            jsxImportSource: 'vue-jsx-vapor',
            baseUrl: undefined,
            customConditions: ['jsx-vapor-dev'],
          },
          tsmCompilerOptions: {
            plugins: [vueJsxVapor({ macros: true })],
          },
        }),
      }) as any,
    ],
    container: {
      infoLabel: 'ИНФОРМАЦИЯ',
      noteLabel: 'ПРИМЕЧАНИЕ',
      tipLabel: 'СОВЕТ',
      warningLabel: 'ПРЕДУПРЕЖДЕНИЕ',
      dangerLabel: 'ОПАСНОСТЬ',
      detailsLabel: 'ПОДРОБНОСТИ',
      importantLabel: 'ВАЖНО',
      cautionLabel: 'ОСТОРОЖНО',
    }
  },
})

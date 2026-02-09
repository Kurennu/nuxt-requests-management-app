export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    typescript: {
        strict: true
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'ru'
            },
            title: 'Управление заявками',
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
            ]
        }
    },
    ssr: false,
    css: ['~/assets/styles/main.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "~/assets/styles/_variables.scss" as *;
                        @use "~/assets/styles/_mixins.scss" as *;
                    `
                }
            }
        }
    }
})

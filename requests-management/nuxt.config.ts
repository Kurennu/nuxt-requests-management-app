// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    typescript: {
        strict: true
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

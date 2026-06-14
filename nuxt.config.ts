import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'

const require = createRequire(import.meta.url)

function getPackageName(moduleName: string) {
  if (moduleName.startsWith('@')) {
    return moduleName.split('/').slice(0, 2).join('/')
  }

  return moduleName.split('/')[0]
}

function isInstalledModule(moduleName: string) {
  try {
    require.resolve(moduleName)
    return true
  } catch {
    const packageName = getPackageName(moduleName)
    const packagePath = join(process.cwd(), 'node_modules', ...packageName.split('/'), 'package.json')

    return existsSync(packagePath)
  }
}

const configuredModules = [
  '@nuxt/eslint',
  '@nuxt/image',
  '@nuxt/ui',
  '@formkit/auto-animate',
  '@hebilicious/form-actions-nuxt',
  '@morev/vue-transitions',
  '@nuxtjs/i18n',
  '@nuxtjs/seo',
  '@vercel/speed-insights',
  '@vesp/nuxt-fontawesome',
  'nuxt-aos',
  'nuxt-booster',
  'nuxt-ssr-api-logger',
  'nuxt-ssr-lit',
  'nuxt-swiper',
  'nuxt-toast',
  'reka-ui/nuxt',
]

const modules = configuredModules.filter((moduleName) => {
  if (isInstalledModule(moduleName)) {
    return true
  }

    console.warn(`[nuxt-config] Skipping missing module: ${moduleName}`)
    return false
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  app: {
    pageTransition: { name: 'rotate', mode: 'out-in' },
  },
  devtools: { enabled: true },

  modules,
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  css: ['~/assets/css/main.css']

})
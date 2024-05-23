import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import unocss from 'unocss/vite';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },
  build: {
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '/images': 'src/assets/images'
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    unocss(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/
      ],
      imports: [{ vue: ['defineComponent'] }],
      dts: path.resolve(__dirname, './src/auto-imports.d.ts'),
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      dts: true,
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    })
  ]
});

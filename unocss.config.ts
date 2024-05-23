import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerAttributifyJsx
} from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  shortcuts: [
    ['flex-x-center', 'flex justify-center'],
    ['flex-center', 'flex items-center'],
    ['flex-space-between', 'flex flex-row items-center justify-between'],
    ['flex-xy-center', 'flex items-center justify-center']
  ],
  transformers: [transformerAttributifyJsx()]
});

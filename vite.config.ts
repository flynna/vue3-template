import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import autoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    autoImport({
      imports: [
        'vue',
        {
          'vue-router': ['useRouter', 'useRoute'],
        },
        {
          '@vueuse/core': ['useVModel', 'useVModels', 'useMouse'],
        },
      ],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 配置文件生成的位置
      dts: 'components.d.ts',
      // 指定需要自动导入的组件库路径（可以是自定义实现的 'src/components'）,配置后，在使用时即可无需再引入到 script
      // 同时，该路径下的所有组件都会添加到 components.d.ts 的声明中
      dirs: [],
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

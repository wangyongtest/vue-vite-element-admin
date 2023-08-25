import { defineConfig, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 生产gz文件
import viteCompression from 'vite-plugin-compression'
import path from 'path'

function resolve (dir) {
  return path.join(__dirname, dir)
}

export default defineConfig(({ mode }:ConfigEnv):UserConfig => {
  if (mode === 'development') {
    //  dev开发环境配置
    return {
      mode,
      resolve: {
        alias: [
          {
            find: '~/',
            replacement: path.resolve(__dirname, 'src/')
          },
          {
            find: '~comp',
            replacement: path.resolve(__dirname, 'src/components/')
          },
          {
            find: '~hooks',
            replacement: path.resolve(__dirname, 'src/hooks/')
          },
          {
            find: '~utils',
            replacement: path.resolve(__dirname, 'src/utils/')
          },
          {
            find: '~styles',
            replacement: path.resolve(__dirname, 'src/styles/')
          },
          {
            find: '~store',
            replacement: path.resolve(__dirname, 'src/store/')
          },
          {
            find: '~api',
            replacement: path.resolve(__dirname, 'src/api/')
          },
          {
            find: '~pages',
            replacement: path.resolve(__dirname, 'src/pages/')
          },
          {
            find: '~assets',
            replacement: path.resolve(__dirname, 'src/assets/')
          },
          {
            find: '~types',
            replacement: path.resolve(__dirname, 'types/')
          }
        ],
        // alias: {
        //     '~/': path.resolve(__dirname, './src/'),
        //     "~store/": path.resolve(__dirname, "./src/store/"),
        //     "~pages/": path.resolve(__dirname, "./src/pages/"),
        //     '~styles/': path.relative(__dirname, './styles/'),
        //     '~public/': path.resolve(__dirname, './public/'),
        // },
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
      },
      plugins: [
        vue(),
        jsx(),
        eslintPlugin({
          cache: false
        }),
        createSvgIconsPlugin({
          // 指定需要缓存的图标文件夹
          iconDirs: [resolve('./src/icons/svg')],
          // 指定symbolId格式
          symbolId: 'icon-[name]'
        })

      ],
      css: {
        preprocessorOptions: {
          scss: {
            // // 加载全局样式，使用scss特性
            additionalData: '@import "~styles/variables.scss";'
          }
        },
        devSourcemap: true
      },
      server: {
        proxy: {
          '/api': {
            target: '',
            changeOrigin: true,
            rewrite: path => path.replace(/\^api/, '')
          }
        }
      }

    }
  } else if (mode === 'pre') {
    //  build环境配置
    return {
      mode,
      resolve: {
        alias: {
          '~/': path.resolve(__dirname, 'src'),
          '~comp': path.resolve(__dirname, 'src/component')
        },
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
      },
      css: {
        preprocessorOptions: {
          scss: {
            // // 加载全局样式，使用scss特性
            additionalData: '@import "./styles/var.scss";'
          }
        },
        devSourcemap: true
      },
      plugins: [vue(), jsx()]
    }
  } else {
    // 生产环境配置
    return {
      mode,
      resolve: {
        alias: {
          '~/': path.resolve(__dirname, 'src'),
          '~comp': path.resolve(__dirname, 'src/component')
        },
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
      },
      plugins: [vue(), jsx(), // gzip压缩 生产环境生成 .gz 文件
        mode === 'production' && viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: 'gzip',
          ext: '.gz'
        })],
      // 生产环境打包配置
      // 去除 console debugger
      esbuild: {
        pure: mode === 'production' ? ['console.log', 'debugger'] : []
      },
      build: {
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      }
    }
  }
})

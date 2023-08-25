# 从零到一搭建脚手架(一)

## 搭建环境
- 技术栈： vue3.0 + + vue-router4 + pinia + vite3 + TS + element-plus + scss

### 安装相关技术栈
- pnpm i  vue vue-router pinia  dataV Element-plus  -S
- pnpm i vite -D
- 配置 vite.config.ts
> 环境搭建好，能够正常运行，打包
> 搭建各个部分组件 ==> 基于性能再次配置vite



#### Q1:
> 找不到名称“__dirname”
> npm add @types/node -D


#### Q2:
权限
1、展示用户信息
2、菜单展示
3、权限展示
4、角色展示
5、租户

#### Q3:编辑器配置eslint
 1、卸载/禁用 vetur 插件
 2、安装 eslint volar 插件
 > 安装并启动了 eslint 插件
 > 如何格式化？
 >> 在eslint 下 找到 Eslint:Enable 前边对勾去掉，表示启用
 >>             找到 Eslint:Run
 3、首选项配置
 4、开发环境下自动检查
 > 安装 vite-plugin-eslint , 然后再vite.config.ts中配置
 ```js
    globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDeafults: 'readonly'
  }
```
全局配置在 eslintrc 文件中

 #### Q4: TS配置
 > vite.d.ts 配置 /// <reference types="vite/client" /> 能获取 import.meta.env 下的属性



#### Q5: 样式文件采用 sass,安装 sass (使用scss 练习使用 bm 规范)
1、在styles中创建 variables.scss(变量) mixin.scss(函数) transitions.scss(动画) common.scss(公共) index.scss 入口
2、 全局使用
> 这里要注意 css 的变量全局导入无法使用， 这里使用 vite 配置， 全局注入形式

#### Q6: 二次封装 Axios


#### Q6 全屏
1、document.fullscreenElement  mozilla.org


#### Q7  主题：
1、使用 element-plus  主题

#### Q8 页面进度条
1、 nprogress @types/nprogress 包 
2、 router.beforeEach/ router.afterEach


#### Q9 性能监控
1、vite-plugin-monitor    



#### Q10 @vueuse/core 插件

### 配置遗留
- node 大于 16 版本
- 使用 pnpm 
- prettier
- styleLint
- husky
- editConfig


https://www.bilibili.com/video/BV1hc41137R7?p=5&vd_source=4d959a0e7ea6a6d9c2df223c79e21ff4
<!-- blog nodejs -->
https://blog.csdn.net/weixin_46393552/article/details/121008927
https://blog.csdn.net/weixin_48675760/article/details/128885425
https://www.zhihu.com/question/414830693/answer/2849014396?utm_id=0
<!-- vue性能 -->
https://cn.vuejs.org/guide/best-practices/performance.html


#### 


### 组件
1、tagsViews √
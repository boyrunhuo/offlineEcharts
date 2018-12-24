# echart-page

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 打包后生成的页面为dist目录下的index.html，需要部署到服务器展示，
# 数据来自dist/static下的fakeData.json
# 如果需要进一步开发，参看以下步骤：
1. 安装node环境(原开发环境为nodev8.11.1)和webpack4
2. 解压项目根目录下的node_modules.zip或通过进入根目录执行npm instll 自行安装依赖（推荐直接解压）
3. 进入根目录执行npm run dev启动项目，项目运行在本地8080端口
4. 开发完成打包：npm run build
5. 打包后生成的文件夹为dist目录

# 作者：软件支持-赵堃圻（火星号：4279）
# vue-identify-comp
## 描述
基于vue2.x+webpack4.x实现的在页面调试时通过页面快速识别整个页面的本地组件结构以及根据某元素查找所在的本地组件，这样便可在不熟悉代码的情况下快速查找到自己需要改动的组件
## 与devTools的区别
仅限于查看本地编写的组件路径
## 功能
##### 1.自动识别页面中的组件编写结构
##### 2.选择某元素可获取所在组件栈

## 安装
```
npm install vue-identify-comp --save-dev
```

## 配置
```
// main.js
import VueIdentifyComp from 'vue-identify-comp'
...
// webpack
Vue.use(VueIdentifyComp, {
    isOpen: true,
    compDir: [
        require.context('../views', true, /\.vue$/),
        require.context('../components', true, /\.vue$/)
    ]
})

// 页面渲染完之后识别组件
VueIdentifyComp.draw()
```

## 选项
| Key | Value | 数据类型 | 默认值 | 描述 | 是否必传 |
| --- | --- | --- | --- | --- | --- |
| isOpen | 是否开启 | Boolean | true | true可以使用本插件功能，false则禁用 | 否 |
|contextDir | 组件上下文 | Array | [] |webpack的上下文依赖 | 是|
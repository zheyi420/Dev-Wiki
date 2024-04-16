## 生命周期

- [vue2 生命周期图示](https://v2.cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA) 
- [vue2 选项 / 生命周期钩子](https://v2.cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90) 


### `created` 和 `mounted` 的区别

`created()`
- 在模板渲染成html前调用。
- 通常用于**初始化某些属性值**，例如data中的数据，然后再渲染成视图。

`mounted()`
- 在模板渲染成html后调用。
- 通常在初始化页面完成后，**对html的dom节点进行需要的操作**。
- 比如有些地图或折线图组件，需要dom节点存在才能绑定，就需要在mounted状态下执行。


| 生命周期    | 是否获取dom节点 | 是否获取data | 是否获取methods |
| ------- | --------- | -------- | ----------- |
| created | 否         | 是        | 是           |
| mounted | 是         | 是        | 是           |

*参考*
- [详解created和mounted区别与使用场景](https://juejin.cn/post/7063098432184909832) 

### `beforeDestroy()`

## 变量

变量申明在 `data() {}` 中与 vue 模块外的脚本的区别。

## `$EventBus`


# Vue 3

## Ecosystem Docs

- [Vue3 入门指南与实战案例](https://vue3.chengpeiquan.com/)
- 
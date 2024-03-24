# qiankun 微前端框架

## 微前端实现原理

微前端框架（其运行时能力）与 SPA 框架路由（React Router DOM、Vue Router 等）类似，本质是通过劫持 `window.history` 和 `replaceState` 方法，以及监听 `popstate` 和 `hashChange` 事件，并根据当前 URL 动态渲染匹配成功的微应用。

1. 监听路由变化
2. 查找符合条件的微应用
3. 加载子应用
4. 渲染子应用


let _apps = []

export const getApps = () => _apps

export const registerMicroApps = (apps) => {
  _apps = apps
}

export const start = () => {

  // 1.监听路由变化
    /**
     * hash路由： window.onhashchange
     * history路由：
     *  history.go, history.back, history.forward 事件：window.onpopstate
     *  pushState,replaceState
     * 需要通过重写方式进行拦截
     */
    
  // 2.查找符合条件的微应用

  // 3.加载子应用

  // 4.渲染子应用
}
import { handleRouter } from "./handle-router";
// 上一个路由
let prevRoute = ''
// 下一个路由
let nextRoute = window.location.pathname

// 导出
export const getPrevRoute = () => prevRoute
export const getNextRoute = () => nextRoute

window.getPrevRoute = getPrevRoute
window.getNextRoute = getNextRoute

// 路由重写拦截
export const rewriteRouter = () => {
  window.addEventListener('popstate', () => {
    // popstate触发时，路由已经完成导航
    // 之前的
    prevRoute = nextRoute 
    // 最新的
    nextRoute = window.location.pathname
    // 触发时页面变动
    console.log('popState', window.location.pathname);
    handleRouter()
  })

  // 备份路由
  const tempPushState = window.history.pushState
  // 历史记录添加路由
  window.history.pushState = (...args) => {
    // 导航前
    prevRoute = window.location.pathname
    tempPushState.apply(window.history, args)
    // 导航后
    nextRoute = window.location.pathname
    // 触发页面变动
    console.log('pushState', window.location.pathname);
    handleRouter()
  }


  // 备份路由
  const tempReplaceState = window.history.replaceState
  // 历史记录重置路由
  window.history.replaceState = (...args) => {
    // 导航前
    prevRoute = window.location.pathname
    tempReplaceState.apply(window.history, args)
    // 导航后
    nextRoute = window.location.pathname
    console.log('replaceState', window.history.pathname);
    handleRouter()
    
  }
}
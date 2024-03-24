
// 路由重写拦截
export const rewriteRouter = () => {
  window.addEventListener('popstate', () => {
    // 触发时页面变动
    console.log('popState', window.location.pathname);
  })

  // 备份路由
  const tempPushState = window.history.pushState
  // 历史记录添加路由
  window.history.pushState = (...args) => {
    tempPushState.apply(window.history, args)

    // 触发页面变动
    console.log('pushState', window.location.pathname);
  }
  // 备份路由
  const tempReplaceState = window.history.replaceState
  // 历史记录重置路由
  window.history.replaceState = (...args) => {

    tempReplaceState.apply(window.history, args)

    console.log('replaceState', window.history.pathname);
  }
}
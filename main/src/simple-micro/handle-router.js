import { getApps } from "."
import { getNextRoute, getPrevRoute } from "./rewrite-router"


// 路由变化后的逻辑
export const handleRouter = async() => {
  const apps = getApps()

  // 获取上一个子应用，后边销毁用
  const prevApp = apps.find(item => getPrevRoute().startsWith(item.activeRule))
  // 匹配子应用
  const app = apps.find(item => getNextRoute().startsWith(item.activeRule))

  if(prevApp) {
    await unmount(prevApp)
  }
  if(!app) return

  // 加载子应用


  // 配置全局变量
  window.__POWERED_BY_QIANKUN__ = true
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + '/'





  // 生命周期函数
  async function bootstrap(app) {
    app.bootstrap && (await app.bootstrap())
  }

  async function mount(app) {
    app.mount && (await app.mount({
      container: document.querySelector(app.container)
    }))
  }

  async function unmount(app) {
    app.unmount && (await app.unmount({
      container: document.querySelector(app.container)
    }))
  }
}
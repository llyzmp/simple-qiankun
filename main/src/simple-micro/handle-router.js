import { getApps } from "."
import { importHTML } from "./import-html"
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
  const { template, execScripts } = await importHTML(app.entry)
  const container = document.querySelector(app.container)
  container.appendChild(template)

  // 配置全局变量
  window.__POWERED_BY_QIANKUN__ = true
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + '/'

  const appExports = await execScripts()
  app.bootstrap = appExports.bootstrap
  app.mount = appExports.mount
  app.unmount = appExports.unmount

  await bootstrap(app)
  await mount(app)

  // getExternalScripts().then((scripts) => {
  //   console.log(scripts)
  // })
  // 请求获取子应用的资源：HTML、CSS、JS
  // const html = await fetch(app.entry).then(res => res.text())
  // // 1. 客户端渲染需要通过执行 JavaScript 来生成内容
  // // 2. 浏览器出于安全考虑，innerHTML 中的 script 不会加载执行
  // container.innerHTML = html

  // 手动加载子应用的 script
  // 执行 script 中的代码
  // eval 或 new Function

  // 4. 渲染子应用


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
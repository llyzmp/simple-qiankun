import { fetchResource } from "./feach-resource"

export const importHTML = async (url) => {
  const html = await fetchResource(url)
  const template = document.createElement('div')
  template.innerHTML = html
  console.log(template);

  const scripts = template.querySelectorAll('script')

  // 获取所有script标签的代码
  function getExernalScripts() {
    return Promise.all(Array.from(scripts).map(script => {
      const src = script.getAttribute('src')
      // 不包含src
      if(!src) {
        return Promise.resolve(script.innerHTML)
      } else {
        return fetchResource(src.startsWith('http') ? src : `${url}${src}`)
      }
    }))
  }

  // 获取并执行所有script脚本代码
  async function execScripts() {
    const scripts = await getExernalScripts()

    // 手动构造一个commonjs模块环境
    const module = { exports: {}}
    const exports = module.exports

    scripts.forEach(code => {
      eval(code)
    })
    return module.exports
  }
  return {
    template,
    getExernalScripts,
    execScripts
  }
} 
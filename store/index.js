import Vue from 'vue'
import Vuex from 'vuex'
// 加载所有模块。
function loadModules() {
  const context = require.context('./modules', false, /([a-z_]+)\.js$/i)
  const modules = context
    .keys()
    .map(key => ({ key, name: key.match(/([a-z_]+)\.js$/i)[1] }))
    .reduce(
      (modules, { key, name }) => ({
        ...modules,
        [name]: context(key).default,
      }),
      {}
    )

  return { context, modules }
}

const { context, modules } = loadModules()

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
})

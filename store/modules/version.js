/**
 * @description: 版本管理
 */
const state = {
  downloadProgress: 0,
  isProgress: false,
}
const mutations = {
  SET_DOWNLOAD_PROGRESS(state, progress) {
    state.downloadProgress = progress
  },
  SET_IS_PROGRESS(state, isProgress) {
    state.isProgress = isProgress
  },
}
const actions = {
  setDownloadProgress({ commit }, progress) {
    commit('SET_DOWNLOAD_PROGRESS', progress)
  },
  setIsProgress({ commit }, isProgress) {
    commit('SET_DOWNLOAD_PROGRESS', 0)
    commit('SET_IS_PROGRESS', isProgress)
  },
}
// const getters = {
//   downloadProgress: state => state.downloadProgress,
//   isProgress: state => state.isProgress,
// }
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

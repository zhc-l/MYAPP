export const navTo = (url, params = {}) => {
    let urlParams = ''
    for (let key in params) {
        urlParams += `&${key}=${params[key]}`
    }
    uni.navigateTo({
        url: `${url}?${urlParams.slice(1)}`,
    })
}
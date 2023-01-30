/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-12-14 22:39:11
 * @LastEditTime: 2022-12-14 22:41:08
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\api\loading.ts
 */
let lastRequest = new Date('2020')

const show = function (config) {
  if (config && config.custom.loading) {
    const now = new Date()
    const ms = now.getMilliseconds() - lastRequest.getMilliseconds()
    lastRequest = now
    if (ms > 2000) {
      // 相隔两秒的请求才重新显示loading
      uni.showLoading({
        title: '加载中...',
        mask: true
      })
    }
  }
}

const hide = function (config) {
  if (config && config.custom.loading) {
    setTimeout(() => {
      uni.hideLoading()
    }, 500)
  }
}

export { show, hide }

/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-13 09:49:15
 * @LastEditTime: 2022-04-13 11:24:44
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\utils\index.ts
 */
function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

function showToast(name) {
  uni.showToast({
    title: name,
    icon: 'none',
    duration: 2000,
    mask: true
  })
}

function showLongToast(name) {
  uni.showToast({
    title: name,
    icon: 'none',
    duration: 3000,
    mask: true
  })
}

export { formatNumber, formatTime, showToast, showLongToast }

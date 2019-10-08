function showToast (name) {
  wx.showToast({
    title: name,
    icon: 'none',
    duration: 2000,
    mask: true
  })
}

function showLongToast (name) {
  wx.showToast({
    title: name,
    icon: 'none',
    duration: 3000,
    mask: true
  })
}

export default {
  showToast,
  showLongToast
}

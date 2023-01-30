/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-12 21:59:51
 * @LastEditTime: 2022-04-28 15:57:23
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\static\functions\messageList\index.js
 */
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  // 先取出集合记录总数
  const countResult = await db.collection('message').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db
      .collection('message')
      .skip(i * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get()
    tasks.push(promise)
  }
  // 等待所有
  const results = await Promise.all(tasks)
  const result = results.reduce((acc, cur) => ({
    data: acc.data.concat(cur.data),
    errMsg: acc.errMsg
  }))
  result.data.sort((a, b) => {
    const v1 = typeof a.customIndex === 'number' ? a.customIndex : 999
    const v2 = typeof b.customIndex === 'number' ? b.customIndex : 999
    return v2 - v1
  })
  return result
}

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  let { _id } = event
  const message = db.collection('message')
  return await message
    .doc(_id)
    .remove()
    .catch(e => console.log(e))
}

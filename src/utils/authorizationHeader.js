import JsSHA from 'jssha'
// jsSHA
export default function getAuthorizationHeader() {
  // 填入自己 ID、KEY 開始
  const AppID = process.env.VUE_APP_ID
  const AppKey = process.env.VUE_APP_KEY
  // 填入自己 ID、KEY 結束
  const GMTString = new Date().toGMTString()
  const ShaObj = new JsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  const HMAC = ShaObj.getHMAC('B64')
  const Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"'
  return { Authorization: Authorization, 'X-Date': GMTString }
}

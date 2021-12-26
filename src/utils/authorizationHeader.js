import JsSHA from 'jssha'
// jsSHA
export default function getAuthorizationHeader () {
  // 填入自己 ID、KEY 開始
  const AppID = '63a8d7db95214e20bac7d3872a6371a4'
  const AppKey = 'nb1XKPLjlA2Lp7W3-o1PYNuu87E'
  // 填入自己 ID、KEY 結束
  const GMTString = new Date().toGMTString()
  const ShaObj = new JsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  const HMAC = ShaObj.getHMAC('B64')
  const Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"'
  return { Authorization: Authorization, 'X-Date': GMTString }
}

export default function formatDate (time) {
  const date = new Date(time)
  const format = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate()
  return format
}

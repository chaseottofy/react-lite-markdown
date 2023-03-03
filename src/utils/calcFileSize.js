export default function calcFileSize(file) {
  const bytes = new Blob([file]).size
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  if (bytes === 0) return '0 Bytes'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10)
  return `${Math.round(bytes / Math.pow(k, i), 2)} ${sizes[i]}`
}
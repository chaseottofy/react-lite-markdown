export default function wordCounter(text) {
  if (!text) {
    return 0;
  }
  const matches = text.match(/\S+/g);
  return matches ? matches.length : 0;
}
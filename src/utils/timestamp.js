export default function timestamp() {
  const date = new Date();
  const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][date.getMonth()];
  const day = parseInt(date.getDate());
  return `${month}${day}`;
}
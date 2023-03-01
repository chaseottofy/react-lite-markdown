/**
 * timestamp
 * @returns {string} JAN7, FEB8, MAR9, etc.
 * @description for use in saveFile.js
 */
export default function timestamp() {
  const date = new Date();
  const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][date.getMonth()];
  const day = parseInt(date.getDate());
  return `${month}${day}`;
}
/**
 * timestamp
 * @returns {string} JAN7, FEB8, MAR9, etc.
 * @description for use in saveFile.js
 */
export default function timestamp() {
  const date = new Date();
  const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][date.getMonth()];
  const day = parseInt(date.getDate());

  const format = (num) => {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }
  const [hour, minute] = [
    format(date.getHours()), 
    format(date.getMinutes())
  ];
  return `${month}${day}_${hour}${minute}`;
}
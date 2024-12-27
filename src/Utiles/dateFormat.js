export const formatDate = (isoString) => {

  const fixedIsoString = isoString.replace(/\.\d+/, (match) => match.slice(0, 4));
  const date = new Date(fixedIsoString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const spacing = '\u00A0\u00A0';

  return `${day}-${month}-${year}${spacing}${hours}:${minutes}:${seconds}`;
}

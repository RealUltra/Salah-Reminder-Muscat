export function formatTime(date: Date, includeSeconds: boolean = false) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}` + (includeSeconds ? `:${seconds}` : "");
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const monthNum = (date.getMonth() + 1).toString().padStart(2, "0");
  const dayNum = date.getDate().toString().padStart(2, "0");
  return `${year}-${monthNum}-${dayNum}`;
}

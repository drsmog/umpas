export function objectToRawString(object) {
  return Object.keys(object)
    .map(key => `${key}=${object[key]}`)
    .join('&');
}

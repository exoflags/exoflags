export function uniq(array) {
  let out = [];

  for (let i = 0; i < array.length; i++) {
    const el = array[i];

    if (out.indexOf(el) === -1) {
      out.push(el);
    }
  }

  return out;
}

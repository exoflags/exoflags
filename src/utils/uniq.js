export function uniq(array) {
  let seen = {};

  for (let i = 0; i < array.length; i++) {
    const el = array[i];

    if (!seen[el]) {
      seen[el] = true;
    }
  }

  return Object.keys(seen);
}

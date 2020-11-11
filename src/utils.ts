export function pick(obj: any, array: string[]) {
  // return obj;

  return Object.entries(obj)
    .filter(([key]) => array.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
}

export function deepPick(obj: any, array: string[]) {
  return array.map((prop) => [
    prop,
    prop.split('.').reduce((a, v) => (a === undefined || a === null) ? null : a[v], obj)
  ]);
}

export function getInitials(fullName: string) {
  return fullName.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g);
}

export function fullName(obj) {
  return obj.type === 'individual' ? concat(obj.firstName, obj.lastName) : obj.name;
}

export function concat(...args: string[]) {
  return args.join(' ').trim();
}

export function getLocation(locationString: string) {
  const cords = locationString.split(',');

  if (cords.length !== 2) {
    return 'Error';
  }

  const latitude = parseFloat(cords[0]);
  const longitude = parseFloat(cords[1]);

  return { latitude, longitude };
}

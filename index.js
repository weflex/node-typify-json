
function serialize (obj) {
  let isarray = Array.isArray(obj);
  let isfirst = true;
  let str = isarray ? '[' : '{';
  let set = (key, val) => {
    str += isarray ? val : `"${key}":${val}`;
  };
  for (let key in obj) {
    if (!isfirst) {
      str += ',';
    } else {
      isfirst = false;
    }
    let val = obj[key];
    if (typeof val === 'string') {
      set(key, `"${val}"`);
    } else if (typeof val === 'number' || typeof val === 'boolean') {
      set(key, val);
    } else if (val instanceof Date) {
      set(key, `new Date("${val}")`);
    } else if (typeof val === 'object') {
      set(key, serialize(val));
    }
  }
  return str + (isarray ? ']' : '}');
}

module.exports = serialize;
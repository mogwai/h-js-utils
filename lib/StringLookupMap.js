const END_CHAR = "/end";

function flatten(prefix, map) {
  let results = [];
  for (const c of Object.keys(map)) {
    const imap = map[c];
    if (c === END_CHAR) results.push(prefix);
    else if (imap && Object.keys(imap).length > 0)
      results = results.concat(flatten(prefix + c, imap));
    else if (imap) results.push(prefix + c);
  }
  return results;
}

function shouldRemove(prefix, map) {
  const chars = prefix.split("");
  if (chars.length === 0 || (chars.length === 0 && chars[0] === END_CHAR)) {
    return null;
  }
  const sliced = prefix.slice(1, prefix.length);
  map[chars[0]] = shouldRemove(sliced, map[chars[0]]);
  return map;
}

/**
 * Parses an array of strings into a character tree
 * for quick prefix matching and string existence checks
 */
class StringLookupMap {
  constructor(arr) {
    this.setArray(arr);
  }
  /**
   * Re-initialise the map with a new array
   * @param {[String]} arr
   */
  setArray(arr) {
    this.characterMap = {};
    arr.forEach((s, i) => {
      if (typeof s !== "string")
        throw new Error(`${s} is not string at [${i}]`);
      else this.add(s);
    });
  }

  /**
   * Add a new string into the map
   * @param {String} s
   */
  add(s) {
    let { characterMap } = this;
    s.split("")
      .concat(END_CHAR)
      .forEach(c => (characterMap = characterMap[c] = characterMap[c] || {}));
  }

  remove(s) {
    if (!this.exists(s)) {
      console.warn("Trying to remove " + s + "but not found");
      return false;
    }
   this.characterMap = shouldRemove(s, this.characterMap);
  }

  /**
   * Gets all strings starting with a certain prefix
   * @param {String} s Prefix query string
   * @returns {[String]} All strings in the map with the queries prefix
   */
  query(s) {
    let map = this.characterMap;
    let prefix = "";
    for (const c of s.split(""))
      if (map[c] && Object.keys(map[c]).length > 0) {
        prefix += c;
        map = map[c];
      } else break;

    return prefix.length === s.length ? flatten(prefix, map) : [];
  }

  /**
   * Checks if the exact string is in the array
   * @param {String} s
   */
  exists(s) {
    let map = this.characterMap;
    for (const c of s.split("").concat(END_CHAR)) {
      const n = map[c];
      if (n) map = n;
      else return false;
    }
    return true;
  }

  /**
   * Converts the map back into an array
   * @returns {[String]}
   */
  toArray() {
    return flatten("", this.characterMap);
  }
}

module.exports = StringLookupMap;

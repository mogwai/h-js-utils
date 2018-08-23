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
    let currentMap = this.characterMap;
    s.split("")
      .concat(END_CHAR)
      .forEach(c => (currentMap = currentMap[c] = currentMap[c] || {}));
  }

  remove(s) {
    throw new Error("Not implemented");
  }

  /**
   * Gets all strings starting with a certain prefix
   * @param {String} s Prefix query string
   * @returns {[String]} All strings in the map with the queries prefix
   */
  query(s) {
    let map = this.characterMap;
    let prefix = "";
    for (const c of s.split("")) {
      if (map[c] && Object.keys(map[c]).length > 0) {
        prefix += c;
        map = map[c];
      } else break;
    }
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

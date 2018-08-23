module.exports = class LookupMap {
  constructor(arr) {
    this.setArray(arr);
  }

  setArray(arr) {
    this.characterMap = {};
    arr.forEach((s, i) => {
      if (typeof s !== "string")
        throw new Error(`${s} is not string at [${i}]`);
      else this.add(s);
    });
  }

  add(s) {
    let currentMap = this.characterMap;
    s.split("")
      .concat("/end")
      .forEach(c => (currentMap = currentMap[c] = currentMap[c] || {}));
  }

  remove(s) {
    throw new Error("Not implemented");
  }

  query(s) {
    let map = this.characterMap;
    let prefix = "";
    for (const c of s.split("")) {
      if (map[c] && Object.keys(map[c]).length > 0) {
        prefix += c;
        map = map[c];
      } else break;
    }
    return prefix.length === s.length ? this._flattenresults(prefix, map) : [];
  }

  _flattenresults(prefix, map) {
    let results = [];
    Object.keys(map).forEach(c => {
      const imap = map[c];
      if (c === "/end") results.push(prefix);
      else if (imap && Object.keys(imap).length > 0)
        results = results.concat(this._flattenresults(prefix + c, imap));
      else if (imap) results.push(prefix + c);
    });
    return results;
  }

  exists(s) {
    let map = this.characterMap;
    for (const c of s.split("").concat("/end")) {
      const n = map[c];
      if (n) map = n;
      else return false;
    }
    return true;
  }

  toArray() {
    return this._flattenresults("", this.characterMap);
  }
};

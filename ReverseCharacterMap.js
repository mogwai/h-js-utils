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
    s.split("").forEach(
      c => (currentMap = currentMap[c] = currentMap[c] || {})
    );
  }

  remove(s) {
    // Not Implemented
  }

  query(s) {
    let map = this.characterMap;
    let prefix = "";

    for (const c of s.split('')) {
      console.log(c);
      if (Object.keys(map[c]).length > 0) {
        prefix += c;
        map = map[c];
      } else return this._flattenresults(prefix, map);
    }
  }

  _flattenresults(prefix, map) {
    let results = [];
    Object.keys(map).forEach(c => {
      const innermap = map[c];
      if (innermap && Object.keys(innermap).length > 0)
        results = results.concat(this._flattenresults(prefix + c, innermap));
      else if (innermap)
        results.push(prefix + c);
    });
    return results;
  }

  exists(s) {
    let map = this.characterMap;
    for (const c of s.split("")) {
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

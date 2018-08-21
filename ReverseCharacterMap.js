module.exports = class LookupMap {
  constructor(arr) {
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
    const map = this.characterMap;
    const chars = s.split("");
    const prefix = "";

    for (const c of chars) {
      if (map.has(c)) {
        prefix += c;
        map = map.get(c);
      } else return this._flattenresults(prefix, map);
    }
  }

  _flattenresults(prefix, map) {
    let results = [];
    Object.keys(map).forEach(c => {
      const innermap = map[c];
      if (Object.keys(innermap).length > 0)
        results = results.concat(this._flattenresults(prefix + c, innermap));
      else {
        results.push(prefix + c);
      }
    });
    return results;
  }

  exists(s) {
    const map = this.characterMap;
    for (const c of s.split("")) {
      if (map.has(c)) map = map.get(c);
      else return false;
    }
    return true;
  }

  toArray() {
    return this._flattenresults("", this.characterMap);
  }
};

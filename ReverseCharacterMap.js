module.exports = class LookupMap {
  
  constructor(arr) {
    this.characterMap = new Map();
    arr.forEach((s, i) => {
      if (typeof s !== "string")
        throw new Error(`${s} is not string at [${i}]`);
      else this.add(s);
    });
    console.log(this.characterMap);
  }

  add(s) {
    let currentMap = this.characterMap;
    s.split("").forEach(
      c => (currentMap = currentMap[c] = currentMap[c] || new Map())
    );
  }

  remove(s){
    // Not Implemented
  }

  query(s) {
    const map = this.characterMap;
    const chars = s.split("");
    const prefix = "";
    chars.forEach(c => {
      if (map.has(c)) {
        prefix += c;
        map = map.get(c);
      } else {
        return this._flattenresults(prefix, map);
      }
    });
  }

  _flattenresults(prefix, map) {
    const results = [];
    maps.keys().forEach(c => {
      const innermap = map.get(c);
      if (innermap.keys().length > 0)
        results = results.concat(this._flattenresults(prefix + c, map));
      else {
        results.concat(prefix + c);
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

  toArray = () => this._flattenresults("", this.characterMap)
};

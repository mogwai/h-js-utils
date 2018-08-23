const StringLookupMap = require("../");
const { genMap, genArr, rand } = require("./util");

for (const x of [3, 4, 5, 6]) {
  let tName = `\n----------\nParse time of length 10^${x}`;
  const data = genArr(Math.pow(10, x), 20);
  console.time(tName);
  const map = new StringLookupMap(data);
  console.timeEnd(tName);

  tName = `Map exists() time`;
  console.time(tName);
  map.exists(data[rand(data.length)]);
  console.timeEnd(tName);

  tName = `Map query() time on short prefix`;
  let s = data[rand(data.length)].substr(0, 2);
  console.time(tName);
  map.query(s);
  console.timeEnd(tName);

  tName = `Map query() time on long prefix`;
  s = data[rand(data.length)].substr(0, 6);
  console.time(tName);
  map.query(s);
  console.timeEnd(tName);
}

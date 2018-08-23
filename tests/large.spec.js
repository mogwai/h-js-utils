const test = require("ava");
const { genArr, rand, timeExec } = require("./util");
const RCMap = require("../src/ReverseCharacterMap");

test.before(t => {
  const largedata = genArr();
  t.context.largedata = largedata;
  t.context.largeMap = new RCMap(largedata);
});

test.skip("Can find in large list", t => {
  const { largeMap, largedata } = t.context;
  const itemToFind = largedata[rand(largedata.length)];
  const maptime = timeExec(_ => largeMap.exists(itemToFind));
  const findtime = timeExec(_ => largedata.find(x => x === itemToFind));
  t.true(maptime < findtime);
});

test.skip("Can query in large list", t => {
  const { largeMap, largedata } = t.context;
  const itemToFind = largedata[rand(largedata.length)];
  const maptime = timeExec(_ => largeMap.exists(itemToFind));
  const findtime = timeExec(_ => {
    // TODO Make this a more fair test?
    let results = [];
    let prefix = "";
    for (const c of itemToFind.split("")) {
      prefix += c;
      let found = largedata.filter(
        x => x.substring(0, prefix.length) === prefix
      );
      if (!found.length) break;
      found = found.filter(x => !results.find(y => y === x));
      results = results.concat(found);
    }
  });
  t.true(maptime < findtime);
});

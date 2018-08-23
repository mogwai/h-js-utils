const test = require("ava");
const { genArr, rand, timeExec } = require("./util");

test.before(t => {
  const largedata = genArr();
  t.context.largedata = largedata;
  t.context.largeMap = new RCMap(largedata);
});

test("Can find in large list", t => {
  const { largeMap, largedata } = t.context;
  const itemToFind = largedata[rand(largedata.length)];
  const maptime = timeExec(_ => largeMap.exists(itemToFind));
  const findtime = timeExec(_ => largedata.find(x => x === itemToFind));
  t.true(maptime < findtime);
});

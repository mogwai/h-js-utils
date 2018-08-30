const test = require("ava");
const RCMap = require("../lib/StringLookupMap");
const { genArr, genMap, rand } = require("./util");

test.before(t => {
  const data = [
    "Harry",
    "Hey there",
    "Hey man",
    "Hey dude",
    "He is a prick",
    "Hi",
    "Hi there",
    "His name is Harry",
    "Hows it going",
    "Who are you",
    "Who is this?"
  ];
  t.context.data = data;
  t.context.map = new RCMap(data);
});

test("Can create", t => {
  t.notThrows(_ => genMap(4, 3));
});

test("Can re-assign", t => {
  t.notThrows(_ => {
    const map = new RCMap(genArr(4, 2));
    map.setArray(genArr(10, 2));
  });
});

test("Can add string", t => {
  const { map } = t.context;
  map.add("Test");
  t.true(map.exists("Test"));
});

test("Can convert to array", t => {
  const data = genArr(10, 20);
  const map = new RCMap(data);
  const arr = map.toArray();
  t.deepEqual(arr.sort(), data.sort());
});

test("Can find string", t => {
  const { map, data } = t.context;
  t.true(map.exists(data[0]));
});

test("Can't find invalid string", t => {
  const { map } = t.context;
  ["Hey mann", "Yo pal", "Sup dude", "Hey thre"].forEach(x =>
    t.false(map.exists(x))
  );
});

test("Prefix in the map doesn't exist", t => {
  const { map } = t.context;
  t.false(map.exists("Ha"));
});

test("Can query strings begining with H", t => {
  const { map, data } = t.context;
  const num = data.filter(x => x[0] === "H");
  t.is(map.query("H").length, num.length);
});

test("Can query strings beginning with Ha", t => {
  const { map, data } = t.context;
  const num = data.filter(x => x.substring(0, 2) === "Ha");
  t.is(map.query("Ha").length, num.length);
});

test("Can query strings beginning with He", t => {
  const { map, data } = t.context;
  const num = data.filter(x => x.substring(0, 2) === "He");
  t.is(map.query("He").length, num.length);
});

test("Query Hitter gives nothing", t => {
  const { map } = t.context;
  t.is(map.query("Hitter").length, 0);
});

test("Can remove a string", t => {
  const arr = genArr(100, 20);
  const map = new RCMap(arr);
  const testString = arr[rand(arr.length)];
  t.true(map.exists(testString));
  map.remove(testString);
  t.false(map.exists(testString));
});

test("After remove(), strings with same prefix still exist", t => {
  const { map } = t.context;
  t.true(map.exists("Hey there"));
  t.true(map.exists("Hey man"));
  t.true(map.exists("Hey dude"));
  map.remove("Hey there");
  t.false(map.exists("Hey there"));
  t.true(map.exists("Hey man"));
  t.true(map.exists("Hey dude"));
});

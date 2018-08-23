const test = require("ava");
const RCMap = require("../src/ReverseCharacterMap");
const { genArr } = require("./util");

test.before(t => {
  const data = [
    "Hey there",
    "Hi",
    "Harry",
    "He is a prick",
    "Hey man",
    "Hey dude",
    "Hows it going",
    "Who are you",
    "Hi there",
    "His name is Harry",
    "Who is this?"
  ];
  t.context.data = data;
  t.context.map = new RCMap(data);
});

test("Can create", t => {
  t.notThrows(_ => new RCMap(genArr(4, 3)));
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

test.todo("Can remove string");

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

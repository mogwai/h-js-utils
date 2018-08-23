const test = require("ava");
const RCMap = require("../src/ReverseCharacterMap");

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 -+?/.,'£$%^&*";

function rand(n = 1) {
  return Math.floor(Math.random() * n);
}

function generateString(n = 1) {
  let s = "";
  while (s.length < n) {
    const ri = rand(CHARS.length);
    s += CHARS[ri];
  }
  return s;
}

function timeExec(fn, name = "op") {
  const start = Date.now();
  console.time(name);
  fn();
  console.timeEnd(name);
  return Date.now() - start;
}

function genArr(length = Math.pow(10, 6), maxStringLength = 20) {
  const arr = [];
  for (let i = 0; i < length; i++)
    arr.push(generateString(rand(maxStringLength)));
  return arr;
}

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
  const largedata = genArr();
  t.context.largedata = largedata;
  t.context.largeMap = new RCMap(largedata);
});

test("Can create", t => {
  t.notThrows(() => new RCMap(["a", "b", "ab", "bc"]));
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

test("Can find in large list", t => {
  const { largeMap, largedata } = t.context;
  const itemToFind = largedata[rand(largedata.length)];
  const maptime = timeExec(x => largeMap.exists(itemToFind), "maptime");
  const findtime = timeExec(
    x => largedata.find(x => x === itemToFind),
    "findtime"
  );
  t.true(maptime < findtime);
});

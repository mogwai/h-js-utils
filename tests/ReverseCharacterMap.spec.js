const { test } = require("ava");
const RCMap = require("../ReverseCharacterMap");

test.beforeEach(t => {
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

test("Can create with small list", t => {
  t.notThrows(() => new RCMap(["a", "b", "ab", "bc"]));
});

test("Can find string", t => {
  const { map, data } = t.context;
  t.true(map.exists(data[0]));
});

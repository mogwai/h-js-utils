const { test } = require("ava");
const RCMap = require("../ReverseCharacterMap");

test.beforeEach(t => {
  t.context = [
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
});

test("Can create with small list", t => {
  t.notThrows(() => new RCMap(t.context));
});


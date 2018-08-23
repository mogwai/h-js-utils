const RCMap = require("./ReverseCharacterMap");

const map = new RCMap([
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
]);

const res = map.query("Ha");
console.log(res);
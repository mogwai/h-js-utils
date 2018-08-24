const StringLookupMap = require(".");

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

const map = new StringLookupMap(data);

map.exists("Hi");

console.log("Starts with H", map.query("Hi"));

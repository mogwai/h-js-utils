const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 -+?/.,'£$%^&*";

const rand = function(n = 1) {
  return Math.floor(Math.random() * n);
};

const generateString = function(n = 1) {
  let s = "";
  while (s.length < n) {
    const ri = rand(CHARS.length);
    s += CHARS[ri];
  }
  return s;
};

const timeExec = function(fn) {
  const start = Date.now();
  fn();
  return Date.now() - start;
};

const genArr = function(length = Math.pow(10, 6), maxStringLength = 20) {
  const arr = [];
  for (let i = 0; i < length; i++)
    arr.push(generateString(rand(maxStringLength)));
  return arr;
};

module.exports = {
  rand,
  genArr,
  generateString,
  timeExec
};

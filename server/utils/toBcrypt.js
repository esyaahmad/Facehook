const bcrypt = require("bcryptjs");

function hash(password) {
  const salt = bcrypt.genSaltSync(9);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function compare(password, hashedpassword) {
  return bcrypt.compareSync(password, hashedpassword);
}

module.exports = { hash, compare };

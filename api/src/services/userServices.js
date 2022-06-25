const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SALT_ROUNDS, CRYPT_KEY, ACCESS_TOKEN_SECRET }= process.env;

async function createUser ({ email, password, firstName, lastName }) {
  const inUse = await User.findOne({ where: { email: email } });
  if (inUse) return {
    message: "Email already in use",
    status: 200,
    data: null
  };
  
  const hash = await bcrypt.hash(`${password}${CRYPT_KEY}`, parseInt(SALT_ROUNDS))
  const user = await User.create({
    email: email,
    password: hash,
    firstName: firstName,
    lastName: lastName
  });
  return {
    message: "User created",
    status: 201,
    data: user.email
  };
};

async function getUserInfo ({ email }) {
  const user = await User.findOne({ where: { email: email } });
  if (user === null) return {
    message: "Email not found",
    status: 404,
    data: null
  };
  return {
    message: "User info found",
    status: 200,
    data: {
      user
      // id: user.id, 
      // email: user.email,
      // firstName: user.firstName,
      // lastName: user.lastName
    }
  };
};

async function loginUser({ email, password }) {
  const user = await User.findOne({ where: { email: email } });
  if (user === null) return {
    message: "Email not found",
    status: 404,
    data: null
  };
  const match = await bcrypt.compare(`${password}${CRYPT_KEY}`, user.password);
  if (match) {
    const authUser = {
      email: user.email,
      name: user.firstName
    };
    const accessToken = jwt.sign(authUser, ACCESS_TOKEN_SECRET);
    return {
      message: "Logged in successfuly",
      status: 200,
      data: user,
      accessToken: accessToken
    };
  }
  return {
    message: "Wrong password",
    status: 403,
    data: null
  };
};

module.exports = {
  createUser,
  getUserInfo, 
  loginUser
}
const { pool } = require("./../../connection");
const SQLQueries = require("./../../SQLQueries/Authentication/Signup");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt_rounds = parseInt(process.env.SALT_ROUNDS);
const validationChecker = require("./../../validationChecker");


const SignUp = async (
  _,
  { name, username, email, password, userType, subType }
) => {


  // console.log("-----------------SAlts round -----------\n ", salt_rounds);
  let _password = await bcrypt.hash(password, salt_rounds);
  console.log("-----------------Encrypted Password -----------\n ", _password);
  // return validationChecker(data);

  return await new Promise((resolve, reject) => {
    pool.query(
      SQLQueries.insertNewSignUp,
      [name, username, email, _password, userType, subType],
      (error, results, fields) => {
        if (error) {
          reject(error.toString());
        } else {
          // var token = jwt.sign({ username:username}, process.env.SECRET_KEY);
          // console.log("-----Token ",token)
          // token=token.toString();
          // var res={sxToken:token,status:"success"}

          resolve("success");
        }
      }
    );
  });
};

module.exports = SignUp;

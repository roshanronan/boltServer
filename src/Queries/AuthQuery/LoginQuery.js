const { pool } = require("./../../connection");
const SQLQueries = require("./../../SQLQueries/Authentication/Login");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Login = async (_, { email, password, type }) => {
  console.log("Login api hitted!!");
  if (type === "admin") {
    return await new Promise((resolve, reject) => {
      pool.query(
        SQLQueries.checkAdminLogin,
        [email, type],
        (error, results, fields) => {
          if (error) {
            reject(error.toString());
          } else {
            if (results.length > 0) {
              if (password != "") {
                resolve(passwordCheck(results, password));
              } else {
                res = { status: "Password can't be empty" };
                resolve(res);
              }
            } else {
              res = { status: "Invalid Credentials" };
              resolve(res);
            }
          }
        }
      );
    });
  } else {
    return await new Promise((resolve, reject) => {
      pool.query(SQLQueries.checkLogin, [email], (error, results, fields) => {
        if (error) {
          reject(error.toString());
        } else {
          if (results.length > 0) {
            if (password != "") {
              resolve(passwordCheck(results, password));
            } else {
              res = { status: "Password can't be empty" };
              resolve(res);
            }
          } else {
            res = { status: "Invalid Credentials" };
            resolve(res);
          }
        }
      });
    });
  }
};

const passwordCheck = async (results, password) => {
  var res;
  let _passwordHash = results[0].password;
  // console.log("**************************", results);
  let passwordMatched = await bcrypt.compare(password, _passwordHash);

  if (passwordMatched) {
    var token = jwt.sign(
      {
        username: results[0].username,
        userId: results[0].userId,
        name: results[0].name,
        email: results[0].email,
        type: results[0].type,
        profilePic: results[0].profilePic,
      },
      process.env.SECRET_KEY
    );
    token = token.toString();
    res = { sxToken: token, status: "success", type: results[0].type };
    console.log("ress", res);
  } else {
    res = { status: "Invalid Credentials!" };
  }

  return res;
};

module.exports = Login;

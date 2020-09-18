const { pool } = require("./../../connection");
const SQLQueries = require("./../../SQLQueries/OTHER/EditUserDetails");
const Authenticate = require("./../../Utils/Authentication");
const bcrypt = require("bcrypt");
const salt_rounds = parseInt(process.env.SALT_ROUNDS);

// const UserAuth = Authenticate(ctx);
// const user_id = UserAuth.user_id;
const EditUserDetails = async (
  _,
  { name, username, user_id, password, phonenumber, country, state }
) => {
  let _password = await bcrypt.hash(password, salt_rounds);

  return await new Promise((resolve, reject) => {
    pool.query(
      SQLQueries.updateUserDetails,
      [name, username, _password, phonenumber, country, state, user_id],
      (error, results, fields) => {
        if (error) {
          reject(error.toString());
        } else {
          console.log("UserDetails Updated: ", results[0]);
          resolve("success");
        }
      }
    );
  });
};

module.exports = EditUserDetails;

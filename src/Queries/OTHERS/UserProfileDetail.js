const { pool } = require("./../../connection");
const SQLQueries = require("./../../SQLQueries/OTHER/UserProfileDetails");
// const Authenticate = require("./../../Utils/Authentication");

const UserProfileDetail = async (_, { user_id }) => {
  // const UserAuth=Authenticate(ctx);
  console.log("----userId----", user_id);
  return new Promise((resolve, reject) => {
    pool.query(
      SQLQueries.selectUserDetails,
      [user_id],
      (error, results, fields) => {
        if (error) {
          reject(error.toString());
        } else {
          console.log(results);
          var obj = {
            name: results[0].name,
            username: results[0].username,
            type: results[0].type,
            email: results[0].email,
            phonenumber: results[0].phonenumber,
            country: results[0].country,
            state: results[0].state,
          };
          resolve(obj);
        }
      }
    );
  });
};

module.exports = UserProfileDetail;

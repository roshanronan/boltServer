const { pool } = require("./../../connection");
const SQLQueries = require("./../../SQLQueries/OTHER/GetUserDetail");
// const Authenticate = require("./../../Utils/Authentication");

const getCustomerDetails = async (_, { id }, ctx) => {
  console.log(id);
  // console.log("user details on login", UserAuth);
  return await new Promise((resolve, reject) => {
    pool.query(
      "select firstName,lastName,mobileNumber,email from customerdetails where id= ?",
      [parseInt(id)],
      (err, results, fields) => {
        // console.log("------Data-----", results[0]);
        resolve(results[0]);
      }
    );
  });
};

module.exports = getCustomerDetails;

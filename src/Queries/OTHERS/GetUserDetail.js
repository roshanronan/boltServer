const { pool } = require("./../../connection");
const SQLQueries = require("./../../SQLQueries/OTHER/GetUserDetail");
const Authenticate = require("./../../Utils/Authentication");

const GetUserDetail = async (_, { userid }, ctx) => {
  console.log(userid)
  // console.log("user details on login", UserAuth);
  return await new Promise((resolve, reject) => {
    pool.query(
      "select * from users where id= ?",
      [parseInt(userid)],
      (err, results, fields) => {
        console.log("------Data-----",results)
        resolve(results[0]);
      }
    );
  });

  //   return await new Promise((resolve, reject) => {
  //     pool.query(
  //       SQLQueries.checkUserDetail,
  //       [email],
  //       (error, results, fields) => {
  //         if (error) {
  //           reject(error.toString());
  //         } else {
  //           if (results.length == 1) {
  //             console.log(results);
  //             let userdetail = [];
  //             results.map((result) => {
  //               userdetail.push(result.username);
  //               userdetail.push(result.type);
  //               userdetail.push(result.profilePic);
  //             });
  //             resolve(userdetail);
  //           }
  //           else{
  //               resolve(["Record not found!"])
  //           }
  //         }
  //       }
  //     );
  //   });
};

module.exports = GetUserDetail;

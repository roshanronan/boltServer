const { pool } = require("./../../connection");
const SQLQueries = require("./../../SQLQueries/OTHER/GetUserDetail");
const Auth = require("./../../Utils/Auth");

const GetUserDetail = async (_, { token }, ctx) => {
  // console.log("user details on login", UserAuth);
  const UserAuth=Auth(token)
  console.log("=======Auth=== is :: ",UserAuth)
  return await new Promise((resolve, reject) => {
    pool.query(
      "select * from users where id= ?",
      [parseInt(UserAuth.user_id)],
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

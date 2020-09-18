const { pool } = require("./../../connection");
const SQLQueries = require("./../../SQLQueries/OTHER/AllUser");
const Authenticate = require("./../../Utils/Authentication")

const AllUser = async (_,{teamName},ctx) => {
//  const UserAuth=Authenticate(ctx);

  return await new Promise((resolve, reject) => {
    pool.query(teamName!=undefined?SQLQueries.selectAllUsersfromASpecificTeam:SQLQueries.selectAllUser,teamName!=undefined?[teamName]:[],(error, results, fields) => {
      if (error) {
        reject(error.toString());
      } else {
        // let userarry = [];
        // results.map(result=>{
        //   userarry.push(result.username)
        // }) 
        resolve(results)
        console.log(results)
        // resolve(userarry);
      }
    });
  });
};

module.exports = AllUser;

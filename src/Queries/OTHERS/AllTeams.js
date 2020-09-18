const { pool } = require("../../connection");
const SQLQueries = require("../../SQLQueries/OTHER/AllUser");
const Authenticate = require("../../Utils/Authentication");

const AllTeams = async (_, { teamName }, ctx) => {
  console.log("value of ctx ",ctx)
   const UserAuth=Authenticate(ctx);

  return await new Promise((resolve, reject) => {
    pool.query("select * from teams", (error, results, fields) => {
      if (error) {
        reject(error.toString());
      } else {
        // let userarry = [];
        // results.map(result=>{
        //   userarry.push(result.username)
        // })
        if (teamName != undefined) {
          pool.query(
            "SELECT COUNT(*) AS totalNoMembers FROM users u INNER JOIN teammembers tm ON tm.userId=u.id INNER JOIN teams ON tm.teamId=teams.id WHERE teams.teamName = ?",
            [teamName],
            (err, data, fields) => {
              if (err) {
              } else {
                console.log("----",data)
                console.log("-before---",results)
                results=JSON.parse(JSON.stringify(results[0]))
                onsole.log("-before---",results)
                results.map(item=>{
                  item.totalNoMembers=data[0].totalNoMembers
                })
                
                // results[0].totalNoMembers = data[0].totalNoMembers;
                console.log("--after--",results)
                resolve(results);
              }
            }
          );
        }

        resolve(results);
        // console.log(results);
        // resolve(userarry);
      }
    });
  });
};

module.exports = AllTeams;

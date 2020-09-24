const { pool } = require("../../connection");
const SQLQueries = require("../../SQLQueries/OTHER/AllUser");
const Authenticate = require("../../Utils/Authentication");

const AllTeams = async (_, { teamName }, ctx) => {
  // console.log("value of ctx ",ctx)
  //  const UserAuth=Authenticate(ctx);
  console.log("----debug ---check teamname ::",teamName)

if(teamName===undefined)
{
  console.log("-----inside")
  
  return await new Promise((resolve, reject) => {
    pool.query("select * from teams",async (error, results, fields) => {
      if (error) {
        reject(error.toString());
      } else {
        // let userarry = [];
        // results.map(result=>{
        //   userarry.push(result.username)
        // })

        results = JSON.parse(JSON.stringify(results));
      let finaldata= await Promise.all(results.map(async item=>{

        if (teamName === undefined) {
         return await new Promise((resolve,reject)=>{
          pool.query(
            "SELECT COUNT(*) AS totalNoMembers FROM users u INNER JOIN teammembers tm ON tm.userId=u.id INNER JOIN teams ON tm.teamId=teams.id WHERE teams.teamName = ?",
            [item.teamName],
            (err, data, fields) => {
              if (err) {
              } else {
                
                
                item.totalNoMembers = data[0].totalNoMembers

                console.log("-after check---", item);

                resolve(item)              
              }
            }
          );

         })
        }

      })

)
        resolve(finaldata)
        // console.log(results);
        // resolve(userarry);
      }
    });
  });
}
else{
  return await new Promise((resolve,reject)=>{
pool.query("select * from teams where teamName=?",[teamName],async(err,results,fields)=>{

  if(err)
  console.log("----Error---",err);
  else{
  
    pool.query(
      "SELECT COUNT(*) AS totalNoMembers FROM users u INNER JOIN teammembers tm ON tm.userId=u.id INNER JOIN teams ON tm.teamId=teams.id WHERE teams.teamName = ?",
      [teamName],
      (err, data, fields) => {

        
          results[0].totalNoMembers = data[0].totalNoMembers
          resolve(results)


      })

  }
  
})
  })
}


};

module.exports = AllTeams;

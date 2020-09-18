const { pool } = require("../../connection");
const Authenticate = require("./../../Utils/Authentication");
const bcrypt = require("bcrypt");
const salt_rounds = parseInt(process.env.SALT_ROUNDS);
const Messaging=require("./../../Queries/OTHERS/TwilioApis/Messaging")

// const validationChecker = require("../../validationChecker");

const AgentRegistration = async (_, { data }, ctx) => {
  console.log("==================data Parsed================", data);
  let _password = await bcrypt.hash(data.password, salt_rounds);

  //   const UserAuth = Authenticate(ctx);
  // return validationChecker(data);
  return await new Promise((resolve, reject) => {
    pool.query(
      "insert into users (name,email,password,type,teamId) values(?,?,?,?,?);",
      [data.name, data.email, _password, data.userType,data.teams],
      (error, results, fields) => {
        if (error) {
          reject(error.toString());
        } else {
          console.log("-----see results -----", results.insertId);
          pool.query(
            "insert into teammembers(userId,teamId) values(?,?)",
            [results.insertId, parseInt(data.teams)],
            (error, results, fields) => {}
          );
          resolve("success");

          Messaging(results.insertId)
        }
      }
    );
  });
};

module.exports = AgentRegistration;

const { GraphQLServer } = require("graphql-yoga");
const { pool } = require("./connection");
const SQLQueries = require("./SQLQueries/Authentication/Signup");
const SignUp = require("./Mutation/AuthMutations/SignupMutation");
const EditUserDetails = require("./Mutation/OTHER/EditUserDetails");
const UserProfileDetail = require("./Queries/OTHERS/UserProfileDetail");
const Login = require("./Queries/AuthQuery/LoginQuery");
const AllUser = require("./Queries/OTHERS/AllUser");
const GetUserDetail = require("./Queries/OTHERS/GetUserDetail");
const { getAllCountries } = require("./Queries/OTHERS/LookUps/LookUpApis");
const CustomerDetails = require("./Mutation/OTHER/CustomerDetails");
const AgentRegistration = require("./Mutation/OTHER/AgentRegistration");
const AllTeams = require("./Queries/OTHERS/AllTeams");
const fileUpload = require("express-fileupload");
const express = require("express");
const url = require("url");
const path = require("path");
const fs = require("fs-extra");
var jwt = require("jsonwebtoken");
const { setTimeout } = require("timers");
const Cron=require("./Cronjob/Cron")
const getCustomerDetails = require("./Queries/OTHERS/getCustomerDetails")
// const Calling =require("./Queries/OTHERS/TwilioApis/Calling")
// Calling()




const docUploadPath = (userId, docFlag) => {
  console.log("---this called----");
  let dirUploadPath;
  console.log("default of docuploadpath");
  dirUploadPath =
    __dirname + "/assets/userUploads/user_" + userId + "/profilepic/";

  return dirUploadPath;
};

const docUploadQuery = (userId, docFlag, filePath) => {
  console.log("userId, docFlag, filePath>>>===", userId, docFlag, filePath);
  pool.query(
    "update users set profilePic = ? where id =?",
    [filePath, userId],
    async (error, results, fields) => {}
  );
};

const resolvers = {
  Query: {
    hello: (_, args, context, info) => {
      return "Hello From Bolt Server";
    },
    Login: Login,
    AllUser: AllUser,
    GetUserDetail: GetUserDetail,
    UserProfileDetail: UserProfileDetail,
    getAllCountries: getAllCountries,
    AllTeams: AllTeams,
    getCustomerDetails:getCustomerDetails,
  },

  Mutation: {
    CustomerDetails: CustomerDetails,
    AgentRegistration: AgentRegistration,
    CreateTeam: async (_, { teamName }, ctx) => {
      return await new Promise((resolve, reject) => {
        pool.query(
          "insert into teams (teamName) values (?)",
          [teamName],
          (err, results, fields) => {
            if (err) {
              reject("failed  :: " + err);
            } else {
              resolve("success");
            }
          } 
        );
      });
    },
    DeleteTeam:async (_, { teamName }, ctx) => {
      return await new Promise((resolve, reject) => {
        pool.query(
          "delete from teams where id =?",
          [teamName],
          (err, results, fields) => {
            if (err) {
              reject("failed  :: " + err);
            } else {
              resolve("success");
            }
          } 
        );
      });
    },

    // IndividualBuyer: IndividualBuyer,
  },
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: (req) => ({
    ...req,
  }),
});
Cron()
server.use(fileUpload());
// server.get("/getProfile", function (req, res) {
//   res.sendFile(path.join(__dirname + "/index.html"));
// });

server.use("/getProfile", (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var userId = query.userId;
  var filename = query.filename; //16_9_2020.xlx
  res.sendFile(
    path.join(
      __dirname,
      "/assets/userUploads/user_" + userId + "/profilepic/" + filename
    )
  );
});

server.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var userId = query.userId;
  var docFlag = query.docFlag;
  docFlag = docFlag != undefined ? parseInt(docFlag) : 1;

  console.log("upload api hitted!!", docFlag);
  console.log("upload api request !!", req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  console.log("req.files >>>", req.files.file); // eslint-disable-line

  sampleFile = req.files.file ? req.files.file : req.files.sampleFile;
  var fileName = sampleFile.name;

  // const dirC =
  //   __dirname + "/assets/userUploads/user_" + userId + "/profilepic/";

  //new documentPath
  let dirC;
  try {
    dirC = docUploadPath(userId, docFlag);
  } catch (err) {
    console.log("----Error----", err);
  }

  fs.emptyDir(dirC, (err) => {
    if (err) return console.error(err);
    console.log("success!");
  });

  fs.mkdirsSync(dirC);

  // pool.query(
  //   "update users set profilePic = ? where id =?",
  //   [sampleFile.name, parseInt(userId)],
  //   async (error, results, fields) => {}
  // );

  uploadPath = dirC + sampleFile.name;

  setTimeout(() => {
    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send("Error Encountered :" + err);
      } else {
        // new docUploadQuery
        docUploadQuery(
          parseInt(userId),
          docFlag,
          docFlag == 1 ? fileName : uploadPath
        );

        if (docFlag == 1) {
          setTimeout(() => {
            pool.query(
              "select username,type,profilePic from users where id =?",
              [parseInt(userId)],
              (err, data, fields) => {
                if (err) {
                  res.status(500).send("Error Encountered :" + err);
                } else {
                  var token = jwt.sign(
                    {
                      username: data[0].username,
                      userId: parseInt(userId),
                      type: data[0].type,
                      profilePic: data[0].profilePic,
                    },
                    process.env.SECRET_KEY
                  );
                  res.status(200).send({ status: "success", sxToken: token });
                }
              }
            );
          }, 200);
        }
        // res.send("Uploaded Successfully")
      }
      // res.redirect("http://localhost :3000/app/account");
    });
  }, 1000);
});
// server.use("/getProfile",(req,res)=>{
// var url_parts = url.parse(req.url, true);
// var query = url_parts.query;
// var userId=query.userId

// // console.log(path.join(__dirname, '/assets/userUploads/user_'+userId+"/"+userId+".jpg"))
// // res.send()
// res.sendFile(path.join(__dirname, '/assets/userUploads/user_'+userId+"/profilepic/user"+userId+".jpg"));

// })

server.start(() => console.log("Server is running on localhost:4000"));

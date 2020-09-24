const { pool } = require("../../connection");
const Messaging = require("../../Queries/OTHERS/TwilioApis/Messaging");
const Authenticate = require("./../../Utils/Authentication");
// const validationChecker = require("../../validationChecker");
const moveFile = require("move-file");
const path = require("path");

const currentDir = __dirname;
let source = path.join(
  currentDir,
  "../../assets/userUploads/user_" //+ UserAuth.user_id + "/" + data.filename
);
let destination = path.join(
  currentDir,
  "../../assets/customers/cid_" // + results.insertId
);

const CustomerDetails = async (_, { data }, ctx) => {
  console.log("==================data Parsed================", data);
  const UserAuth = Authenticate(ctx);

  // return validationChecker(data);
  return await new Promise((resolve, reject) => {
    pool.query(
      "insert into customerdetails (userId,formType,repId,language,firstName,lastName,btn,mobileNumber,email,d2dTelephonic,state,rateCode,utility,plan,accountNumber,meterNumber,houseNumber,streetPrefix,streetName,streetSuffix,aptSuiteNumber,serviceCity,serviceState,zipcode,billingHouseNumber,billingStreetPrifix,billingStreetNumber,billingStreetSuffix,billingAptSuiteNumber,billingServiceCity,billingServiceState,billingZipcode) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        UserAuth.user_id,
        data.formType,
        data.repId,
        data.language,
        data.firstName,
        data.lastName,
        data.btNumber,
        data.mobileNumber,
        data.email,
        data.d2dTelephonic,
        data.state,
        data.rateCode,
        data.utility,
        data.plan,
        data.accountNumber,
        data.meterNumber,
        data.houseNumber,
        data.streetPrefix,
        data.streetName,
        data.streetSuffix,
        data.aptSuiteNumber,
        data.serviceCity,
        data.serviceState,
        data.zipcode,
        data.billingHouseNumber,
        data.billingStreetPrefix,
        data.billingStreetName,
        data.billingStreetSuffix,
        data.billingAptSuiteNumber,
        data.billingServiceCity,
        data.billingServiceState,
        data.billingZipcode,
      ],
      (error, results, fields) => {
        if (error) {
          reject(error.toString());
        } else {
          console.log("-----see results -----", results.insertId);
          // Messaging(data.mobileNumber, parseInt(results.insertId));

          (async () => {
            await moveFile(
              source + UserAuth.user_id + "/" + data.filename,
              destination + results.insertId+"/"+data.filename
            );
            console.log("The file has been moved");
          })();

          _;
          resolve("success");
        }
      }
    );
  });
};

module.exports = CustomerDetails;

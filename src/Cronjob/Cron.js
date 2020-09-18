const { pool } = require("./../connection");
const Excel = require("exceljs");
const moment = require("moment");

var cron = require("node-cron");

var EasyFtp = require("easy-ftp");
var ftp = new EasyFtp();
var config = {
  host: "75.99.150.115",
  port: 990,
  username: "BoltP",
  password: "/v+NDMw=Z,7nT6mX",
  type: "ftp",
  secure: true,
  ssl:true,
};

//0 7 * * *
const Cron = () => {
  cron.schedule("0 7 * * * ", () => {
    CreateReport();
    // uploadReport();
  });
};

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

const CreateReport = () => {
  var previousDate = moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss");
  var reportDate = moment().subtract(1, "days").format("YYYY-MM-DD");
  pool.query(
    "select * from customerdetails where createdAt >  ?",
    [previousDate],
    async (err, result, fields) => {
      if (err) {
        console.log("error occured");
      } else {
        //   console.log("done")
        // //   console.log(buffer)
        // console.log("kujh b aa jaa",exportToCSV(result,"Demo"))

        let workbook = new Excel.Workbook();
        let worksheet = workbook.addWorksheet("testSheet");

        result = JSON.parse(JSON.stringify(result));
        console.log("agtere", result);

        worksheet.columns = [
          { header: "Id", key: "id", width: 20 },
          { header: "Agent ID", key: "userId", width: 32 },
          { header: "Form Type", key: "formType", width: 200 },
          { header: "Rep Id", key: "repId", width: 20 },
          { header: "Language", key: "language", width: 20 },
          { header: "First Name", key: "firstName", width: 20 },
          { header: "Last Name", key: "lastName", width: 20 },
          { header: "BT Number", key: "btn", width: 20 },
          { header: "Mobile Number", key: "mobileNumber", width: 20 },
          { header: "Email", key: "email", width: 20 },
          { header: "D2D Telephonic", key: "d2dTelephonic", width: 20 },
          { header: "State", key: "state", width: 20 },
          { header: "Rate Code", key: "rateCode", width: 20 },
          { header: "Utility", key: "utility", width: 20 },
          { header: "Plan", key: "plan", width: 20 },
          { header: "Account Number", key: "accountNumber", width: 20 },
          { header: "Meter Number", key: "meterNumber", width: 20 },
          { header: "House Number", key: "houseNumber", width: 20 },
          { header: "Street Prefix", key: "streetPrefix", width: 20 },
          { header: "Street Name", key: "streetName", width: 20 },
          { header: "Street Suffix", key: "streetSuffix", width: 20 },
          { header: "Apt Number", key: "aptSuiteNumber", width: 20 },
          { header: "Service City", key: "serviceCity", width: 20 },
          { header: "Service State", key: "serviceState", width: 20 },
          { header: "Zip Code", key: "zipcode", width: 20 },
        ];

        // console.log(worksheet)

        result.forEach((e, index) => {
          // row 1 is the header.
          const rowIndex = index + 2;
          worksheet.addRow({ ...e });
          // By using destructuring we can easily dump all of the data into the row without doing much
          // We can add formulas pretty easily by providing the formula property.
          //   worksheet.addRow({
          //     ...e,
          //   });
          // worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});
        });

        await workbook.xlsx.writeFile("Report_" + reportDate + ".xlsx");
        // console.log("excel",workbook.xlsx.writeFile('Demotested.xlsx'))
      }
    }
  );

  //   console.log("--------------", previousDate);
};

const uploadReport = () => {
  ftp.connect(config);
  console.log("ftp.connect(config);", ftp.connect(config));
  ftp.mkdir("/dirTest", function (err) {});
  // ftp.upload("/test.txt", "/Contracts/test.txt", function (err) {
  //   console.log("Error occured");
  // });
  ftp.close;
};

module.exports = Cron;

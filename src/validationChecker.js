const validationChecker = (data, flag) => {
  console.log("validation checker called...");
  let k = [];
  k.push(fieldValidator(data.firstname, "firstname"));
  k.push(fieldValidator(data.surname, "surname"));

  let result = "";
  console.log(k);
  k.map((item) => {
    if (typeof item === "string") {
      result += item;
    }
  });

  console.log("--------\n", result);
  return result;

  // return k;
};

// const validator = (fieldVal, array) => {
//   if (fieldVal != null) array.push(fieldVal);
// };

const fieldValidator = (field, fieldname) => {
  let res;

  console.log("Field received", field);
  switch (field) {
    case null || undefined || "":
      res = "Required " + fieldname + "! field not Entered";
      break;
  }
  return res;
};

module.exports = validationChecker;

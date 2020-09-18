const EditUserDetailsQuery = {
  updateUserDetails:
    "update users set name =?, username=?,password=?,phonenumber=?,country=?,state=? where id=?",
};
module.exports = EditUserDetailsQuery;

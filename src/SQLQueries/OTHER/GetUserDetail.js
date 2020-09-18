const GetUserDetail = {
  checkUserDetail: "select username,type,profilePic from users where email =?",
};

module.exports = GetUserDetail;

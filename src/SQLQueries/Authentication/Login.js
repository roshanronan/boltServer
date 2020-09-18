const login_query = {
  checkLogin:
    "select id as userId,name,email,password,username,type,profilePic from users where email =? and type=?",
};

module.exports = login_query;

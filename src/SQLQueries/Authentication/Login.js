const login_query = {
  checkAdminLogin:
    "select id as userId,name,email,password,username,type,profilePic from users where email =? and type=?",
  checkLogin:
    "select id as userId,name,email,password,username,type,profilePic from users where email =?",
};

module.exports = login_query;

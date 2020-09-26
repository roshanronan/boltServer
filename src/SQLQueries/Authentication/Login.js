const login_query = {
  checkAdminLogin:
    "select id as userId,name,email,password,username,type,profilePic from users where email =? and type=?",
  checkLogin:
    "SELECT u.id AS userId,u.name,u.email,u.password,u.username,u.type,u.profilePic,u.teamId,t.teamName FROM users  u LEFT JOIN teams t ON t.id=u.teamID WHERE email =?",
};

module.exports = login_query;

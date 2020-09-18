const Signup_Queries = {
  insertNewSignUp:
    "insert into users (name,username,email,password,type,subtype) values (?,?,?,?,?,?)",
};

module.exports = Signup_Queries;

const jwt = require("jsonwebtoken");

const Auth = (token) => {
 try{
     
    const userid = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        return decoded.userId; // bar
      });
  
      const username = jwt.verify(
        token,
        process.env.SECRET_KEY,
        (err, decoded) => {
          return decoded.username; // bar
        }
      );
  
      const type = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        return decoded.type;
      });
  
      const profilePic = jwt.verify(
        token,
        process.env.SECRET_KEY,
        (err, decoded) => {
          return decoded.profilePic;
        }
      );
  
      const email = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        return decoded.email;
      });
  
      const name = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        return decoded.name;
      });
  
      // const {user_id } = jwt.verify(token, config.SESSION_SECRET);
      var obj = {
        user_id: userid,
        username: username,
        type: type,
        profilePic: profilePic,
        email: email,
        name: name,
      };
  
      return obj;

 }
 catch(error){


    console.log("----error--Decoding ---Authorization ---token ::",error)
 }
  }



module.exports = Auth;

const jwt = require("jsonwebtoken");

const Authenticate = (context) => {
  const Authorization = context.request.get("authorization");

  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    if (token == "" || token == null) {
      throw new Error("User is not Authorized !");
    }
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

  throw new Error("User is not Authorized !");
};

module.exports = Authenticate;

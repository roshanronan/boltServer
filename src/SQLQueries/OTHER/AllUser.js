const AllUserQuery = {
  selectAllUser: "SELECT * FROM users u INNER JOIN teammembers tm ON tm.userId=u.id INNER JOIN teams ON tm.teamId=teams.id",
  selectAllUsersfromASpecificTeam:"SELECT * FROM users u INNER JOIN teammembers tm ON tm.userId=u.id INNER JOIN teams ON tm.teamId=teams.id where teams.teamName = ?"
};

module.exports = AllUserQuery;

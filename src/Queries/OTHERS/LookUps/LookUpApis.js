const { pool } = require("./../../../connection");

const getAllCountries = async (_, {}) => {
  return await new Promise((resolve, reject) => {
    pool.query("select Code,Name from country", (error, results, fields) => {
      resolve(results);
    });
  });
};

module.exports = {
  getAllCountries: getAllCountries,
};

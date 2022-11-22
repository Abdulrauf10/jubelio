const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'Rauf10',
  host: 'localhost',
  database: 'jubelio',
  port: 5432
});

module.exports = pool;
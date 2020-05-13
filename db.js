const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'toor',
    host: 'localhost',
    port: 5432,
    database: 'togetherpray'
});

module.exports = pool;
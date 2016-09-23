var config = {
  'db' : {
    user: 'postgres',
    database: 'reactdit',
    password: 'mysecretpassword',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000, 
  }
};

module.exports = config;

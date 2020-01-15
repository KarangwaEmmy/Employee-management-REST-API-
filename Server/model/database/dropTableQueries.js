import pool from '../../config/config';

const dropTables = 'DROP TABLE IF EXISTS Employee';

const queryString = `${dropTables}`;
pool.query(queryString)
  .then(() => console.log('Hello Manager You are Successfully droped Table!'))
  .catch();

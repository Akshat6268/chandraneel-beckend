const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // Do not exit the process, allow pg to reconnect
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to Neon PostgreSQL Database');
    client.release();
  } catch (err) {
    console.error('Error connecting to the database', err.stack);
  }
}

testConnection();

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};

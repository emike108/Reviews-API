import mysql from 'mysql2/promise';
import dbConfig from './config.js'

const connection = await mysql.createConnection(dbConfig);

connection.connect(err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully connected to mysql database');
  }
})

export default connection;
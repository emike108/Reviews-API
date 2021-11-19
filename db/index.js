import mysql from 'mysql2';
import dbConfig from './config.js'

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully connected to mysql database');
  }
})

export default connection;
import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'mandatory1-myqsql-server.mysql.database.azure.com',
  user: 'nicolaj@mandatory1-myqsql-server',
  password: 'nicolajkea',
  database: 'classicmodels',
  port: 3306
});

connection.connect((err: mysql.MysqlError) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);

  connection.query('SHOW TABLES;', (error: mysql.MysqlError, results: any) => {
    if (error) {
      console.error('Error querying database: ' + error.stack);
      return;
    }

    console.log('Tables:', results);
  });

});
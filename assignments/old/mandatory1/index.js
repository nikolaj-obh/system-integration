const mysql = require('mysql2/promise');

var conn = mysql.createConnection({
    host: "mandatory1-myqsql-server.mysql.database.azure.com", 
    user: "nicolaj@mandatory1-myqsql-server", 
    password: "nicolajkea", 
    database: "classicmodels", 
    port: 3306, 
    });

async function main() {
  // Create a connection to the database
  const connection = await mysql.createConnection(conn);

  try {
    // Execute a query and fetch all rows
    const [rows] = await connection.query('SELECT * FROM classicmodels.offices');
    console.log(rows);
  } catch (error) {
    console.error(error);
  } finally {
    // Close the connection
    await connection.end();
  }
}

main();

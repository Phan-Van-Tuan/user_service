import mysql from 'mysql2/promise';

// Environment variables for database configuration
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

// Configuration object for the database connection
const config = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: "financial_management",
};

// Function to create the table if it does not exist
async function createTableIfNotExists(connection) {
    const createUserTableSQL = `
        CREATE TABLE IF NOT EXISTS user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    try {
        await connection.query(createUserTableSQL);
    } catch (err) {
        console.error('Error creating user table:', err);
    }
}

async function initializeDatabase() {
    try {
        const connection = await mysql.createConnection(config);
        await createTableIfNotExists(connection);
        return connection;
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }
}

const connection = await initializeDatabase();

export default connection;



import mysql from 'mysql2/promise';
import cf from './variable.config.js'

// Configuration object for the database connection
const config = {
    host: cf.DB_HOST,
    user: cf.DB_USER,
    password: cf.DB_PASSWORD,
    database: cf.DB_DATABASE,
};

// Function to create the table if it does not exist
async function createTableIfNotExists(connection) {
    const createUserTableSQL = `
        CREATE TABLE IF NOT EXISTS user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    try {
        await connection.query(createUserTableSQL);
    } catch (err) {
        console.error('Error creating user table:', err);
    }

    const createPaymentTableSQL = `
        CREATE TABLE IF NOT EXISTS payment (
            id VARCHAR(20) PRIMARY KEY,
            user_id VARCHAR(20) NOT NULL UNIQUE,
            amount VARCHAR(255) NOT NULL,
            method VARCHAR(20) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    try {
        await connection.query(createPaymentTableSQL);
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



import mysql from 'mysql2/promise';

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

class DatabaseLoader {
    constructor() {
        this.config = {
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD, 
            database: DB_DATABASE,
        };
        this.connection = null;
    }

    // Tạo kết nối tới cơ sở dữ liệu
    async connect() {
        if (!this.connection) {
            this.connection = await mysql.createConnection(this.config);
            console.log('Database connected successfully.');
        }
    }

    // Đóng kết nối cơ sở dữ liệu
    async disconnect() {
        if (this.connection) {
            await this.connection.end();
            this.connection = null;
            console.log('Database disconnected successfully.');
        }
    }

    // Thực hiện truy vấn
    async query(sql, params) {
        await this.connect(); // Đảm bảo rằng kết nối đã được tạo trước khi thực hiện truy vấn
        const [results] = await this.connection.execute(sql, params);
        return results;
    }
}

export default DatabaseLoader;

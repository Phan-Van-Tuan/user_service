import connection from '../configs/database.config.js';
import bcrypt from 'bcrypt';

class User {
    constructor(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.email = user.email;
        this.password = user.password;
    }

    static async create(newUser) {
        try {
            const result = await connection.query("INSERT INTO user SET ?", newUser);
            return { id: result.insertId, ...newUser };
        } catch (err) {
            throw err;
        }
    }

    static async verify(user) {
        try {
            const [results, fields] = await connection.query(
                'SELECT * FROM user WHERE email = ?',
                user.email
            );
            if (results.length > 0) {
                return results;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async getAll() {
        try {
            const [results, fields] = await connection.query(
                'SELECT * FROM user'
            );

            return results; // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
        } catch (err) {
            console.log(err);
        }
    }

    static async getByEmail(email) {
        try {
            const [results] = await connection.execute(
                'SELECT * FROM user WHERE email = ?', [email]
            );
            return results;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    
    static async getUsername(userName) {
        try {
            const [results] = await connection.execute(
                'SELECT * FROM user WHERE userName = ?', [userName]
            );
            return results;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    static async getPassword(data) {
        try {
            const [results] = await connection.execute(
                'SELECT password FROM user WHERE email = ? OR userName =?', [data.email, data.userName]
            );
            return results;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async getUser(data) {
        try {
            console.log(data);
            const [results] = await connection.execute(
                'SELECT * FROM user WHERE email = ? OR userName =?', [data.email, data.userName]
            );
            return results;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async hashPassword(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Sử dụng bcrypt để mã hóa mật khẩu
            return hashedPassword;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async comparePassword(plainPassword, hashedPassword) {
        try {
            const match = await bcrypt.compare(plainPassword, hashedPassword); // So sánh mật khẩu
            return match; // Trả về true nếu khớp, false nếu không khớp
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};    

export default User;
import connection from '../configs/database.config.js';

class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
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

    // static async getById(userId) {
    //     try {
    //         const data = await db.query("SELECT * FROM user WHERE id = ?", [userId]);
    //         if (data.length) {
    //             return new User(data[0]);
    //         } else {
    //             throw new Error('User not found');
    //         }
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // static async update(userId, updatedUser) {
    //     try {
    //         await db.query("UPDATE user SET ? WHERE id = ?", [updatedUser, userId]);
    //         return { id: userId, ...updatedUser };
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // static async delete(userId) {
    //     try {
    //         await db.query("DELETE FROM user WHERE id = ?", [userId]);
    //         return { message: 'User deleted successfully' };
    //     } catch (err) {
    //         throw err;
    //     }
    // }
}

export default User;
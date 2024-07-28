import connection from '../configs/database.config.js';

class Payment {
    constructor(payment) {
        this.id = payment.id;
        this.userId = payment.userId;
        this.amount = payment.amount;
        this.method = payment.method;
    }

    static async create(newPayment) {
        try {
            const result = await connection.query("INSERT INTO payment SET ?", newPayment);
            return { result, ...newPayment };
        } catch (err) {
            throw err;
        }
    }

    static async getAll() {
        try {
            const [results, fields] = await connection.query(
                'SELECT * FROM payment'
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

export default Payment;
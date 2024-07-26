import User from "../models/user.model.js";

class AuthControler {
    async createUser(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const newUser = { name, email, password };
            const user = await User.create(newUser);
            console.log('Created user:', user);
            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    // Lấy tất cả người dùng
    async fetchUsers(req, res, next) {
        try {
            const users = await User.getAll();
            console.log('All users:', users);
            res.json(users);
        } catch (err) {
            next(err);
        }
    }

    // // Lấy người dùng theo ID
    // async fetchUserById(userId) {
    //     try {
    //         const user = await User.getById(userId);
    //         console.log('User:', user);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // // Cập nhật người dùng
    // async updateUser(userId) {
    //     try {
    //         const updatedUser = { name: 'Jane Doe', email: 'jane.doe@example.com', password: 'newpassword123' };
    //         const user = await User.update(userId, updatedUser);
    //         console.log('Updated user:', user);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // // Xóa người dùng
    // async deleteUser(userId) {
    //     try {
    //         const result = await User.delete(userId);
    //         console.log(result);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

}


export default new AuthControler;
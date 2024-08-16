import e from "express";
import User from "../models/user.model.js";
const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = { firstName, lastName , userName, email, password };
        const user = await User.create(newUser);
        console.log('Created user:', user);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

    // Lấy tất cả người dùng
const getUsers = async (req, res, next) => {
    try {
        const users = await User.getAll();
        console.log('All users:', users);
        res.json(users);
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.getById(id);
        console.log('User:', user);
        res.json(user);
    } catch (err) {
        next(err);
    }};


export default { createUser, getUsers, getUser };
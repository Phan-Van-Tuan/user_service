
import express from 'express';
import connection from '../configs/database.config.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import {google} from 'googleapis';
const OAuth2 = google.auth.OAuth2;
import creatCodeVerify  from '../utils/creatCodeVetify.js';
// import encrypt from '../utils/confirmation.js';
// import decrypt from '../utils/confirmation.js';

const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
const EMAIL = process.env.GMAIL_EMAIL;

const sendEmail = async ({ email, userName, codeVerify, res }) => {
    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
    );

    oauth2Client.setCredentials({
        refresh_token : REFRESH_TOKEN
    });

    const accessToken = await new Promise((resolve , reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if(err) return reject(err);
            resolve(token);
        });
    });

    const transport = nodemailer.createTransport({
        service : "GMAIL",
        auth : {
            type: "OAuth2",
            user : EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken : accessToken,
        }
    });

    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "Welcome to Financial Management",
        html: `
        <h1>Hello ${userName}</h1>
        <p>Thanks for signing up for Financial Management. We're excited to have you on board.</p>
        <p><b>YOUR CONFIRMATION CODE IS ${codeVerify}</b></p>
        `
    };

    let send = await transport.sendMail( mailOptions , (err, response ) => {
        if( err ) {
            res.status(400)
        }else {
            res.status(200).json({
                message: "Email sent successfully",
            })
        }
    })
};

const setCookie = (dataSignup, res) => {
    try {
        res.cookie('user', dataSignup);
    } catch (error) {
        console.log( " nguywn ", error);
    }
};

const getCookie = (req) => {
    const data = req.cookies.user;
    return data;
};

const deleteCookie = (res, cookieName) => {
    res.cookie(cookieName, '', { expires: new Date(0) });
};


const signUp = async (req, res, next) => {
    try {
        const { firstName, lastName, userName, email, password } = req.body;

        if (!firstName || !lastName || !userName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existEmail = await User.getByEmail(email);
        if (existEmail.length) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const existUserName = await User.getUsername(userName);
        if (existUserName.length) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const codeVerify = await creatCodeVerify(6);
        const dataSignup = {
            firstName,
            lastName,
            userName,
            email,
            password,
            isConfirmation: false,
            codeVerify,
        };
        console.log("dataSignup",dataSignup);
        // Set cookie before sending email
        setCookie(dataSignup, res);
        console.log("dataSignup", 1 );
        // const confimationToken = encrypt(userName);
        await sendEmail({ email, userName , codeVerify, res });

        // Retrieve the cookie to check confirmation status
        const { isConfirmation } = getCookie(req);
        console.log("isConfirmation",isConfirmation);

    } catch (err) {
        next(err);
    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const { userName } = req.params;
        // const userName = becrypt( confimationToken );
        const codeVerifyUser = req.body.codeVerify;
        String(codeVerifyUser);

        const data = getCookie(req);
        const { codeVerify } = data;
        String(codeVerify);

        if (codeVerify === codeVerifyUser) {
            res.cookie('isConfirmation', true);
            if (res.cookie('isConfirmation')) {
                const hashedPassword = await User.hashPassword(data.password);
                const user = await User.create({
                    firstName : data.firstName,
                    lastName : data.lastName,
                    userName : data.userName,
                    email: data.email.toLowerCase(),
                    password: hashedPassword
                });
    
                return (res.status(201).json({ message: 'User created successfully', user }
                ));
            } else {
                return (res.status(400).json({ error: 'User not confirmed' }),
                        deleteCookie(res, 'user'));
            }
            return res.status(201).json({
                message: "User created successfully!"
            });
        } else {
            return res.status(400).json({
                message: "Verification code does not match."
            });
        }
    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            res.status(500).json({
                message: "Internal server error."
            });
        }
    }
};

const login = async (req, res, next) => {
    try {
        const { userNameOrEmail , password } = req.body;

        const dataLogin = {
            userName : userNameOrEmail,
            email : userNameOrEmail,
            password : password
        }

        if(!userNameOrEmail || !password ) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const data = regexEmail.test(userNameOrEmail)
            ? { email: userNameOrEmail, userName: null }
            : { userName: userNameOrEmail, email: null };


        const user = await User.getUser(data);
        const existPassword = await User.getPassword(data);
        password.toString();
        console.log(existPassword[0].password)
        existPassword[0].password.toString();

        const comparePassword = await User.comparePassword(password, existPassword[0].password);
        console.log(comparePassword)

        if(!user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if(user && ( comparePassword === true)) {
            const email = user.email;
            const token = jwt.sign(
                { user: email },
                process.env.TOKEN_SECRET_KEY,
                {
                  expiresIn: "2h",
                }
              );
            user.token = token;
            
            console.log(user.token)
            return res.status(200).json({
                message: 'User logged in successfully',
                user
            });
        }else if(user && ( comparePassword === false)) {
            return res.status(400).json({
                error: 'Password is incorrect'
            });
        }
        res.status(200).json({
            message: 'User logged in successfully',
            user
        });
    } catch (err) {
        next(err);
    }
}

export default { signUp, login , verifyEmail };
const db = require('../db');
const { hash } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants/index');

exports.getUsers = async (req, res) => {
    try {
        const { rows } = await db.query(`SELECT user_id, email FROM users`);
        return res.status(200).json({
            success: true,
            users: rows
        });
    } catch(error) {
        console.log(error.message);
    }
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await hash(password, 10);
        let q = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (q.rows.length) {
            await db.query(`UPDATE users SET password = $1 WHERE email = $2`, [hashedPassword, email]);
        } else {
            await db.query(`INSERT INTO users (email, password) VALUES ($1, $2)`, [email, hashedPassword]);
        }
        q = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const user_id = q.rows[0].user_id;
        const payload = { 
            id: user_id,
            email: email 
        };
        const token = await sign(payload, SECRET, { expiresIn: 60 * 60 * 24 }); //create jwt token
        return res.status(201).cookie('token', token, { httpOnly: true, secure: true }).json({
            success: true,
            message: 'The registration was successful',
            user_email: email
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    const user = req.user;
    const payload = {
        id: user.user_id,
        email: user.email
    };
    const rememberUser = req.body.isChecked; //true or false if the user selected to be remembered upon login
    const expiryTime = rememberUser ? 60 * 60 * 24 * 365 : 60 * 60 * 24; //365 days or 1 day
    
    try {
        const token = await sign(payload, SECRET, { expiresIn: expiryTime }); //create jwt token
        return res.status(200).cookie('token', token, { httpOnly: true, secure: true }).json({ //send the user a cookie
            success: true,
            message: 'Logged in successfully',
            user_email: user.email
        })
    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        });
    }
};

exports.loginFailed = (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure'
    });
};

exports.loginSuccess = (req, res) => { 
    //passport.js will send a user in the request if successful
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'successful',
            user: req.user
        })
    } else{
        res.status(401).json({
            success: false,
            message: 'login successful but no user in the request'
        })
    }
};

exports.protected = (req, res) => {
    try {
        res.status(200).json({
            info: 'protected info'
        });
    } catch(error) {
        console.log(error.message);
    }
};

//delete the cookie/token
exports.logout = async (req, res) => {
    try {
        req.logout();
        return res.status(200).clearCookie('token', { httpOnly: true, secure: true }).json({ //send the user a cookie
            success: true,
            message: 'Logged out successfully'
        })
    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        });
    }
};
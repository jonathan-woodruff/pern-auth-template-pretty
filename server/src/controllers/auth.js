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
        const payload = { 
            id: q.rows[0].user_id,
            email: email 
        };
        const token = await sign(payload, SECRET, { expiresIn: 60 * 60 * 24 }); //create jwt token
        return res.status(201).cookie('token', token, { httpOnly: true, secure: true }).json({
            success: true,
            message: 'The registration was successful'
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
            message: 'Logged in successfully'
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

/*
exports.sso = async (req, res) => {
    const ssoToken = req.body.ssoToken;
    const payload = {
        ssoToken: ssoToken
    };
    
    try {
        const token = await sign(payload, SECRET); //create jwt token
        return res.status(200).cookie('token', token, { httpOnly: true }).json({ //send the user a cookie
            success: true,
            message: 'Logged in successfully'
        })
    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        });
    }
};*/

exports.protected = (req, res) => {
    try {
        console.log('heyyyyyyyy ' + req.user.email);
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

/*
//get the Google Client Id
exports.getGoogleClientId = async (req, res) => {
    try {
        return res.status(200).json({
            googleClientId: GOOGLE_CLIENT_ID
        });
    } catch(error) {
        console.log(error.message);
    }
};*/

/*
exports.requestReset = async (req, res) => {
    const userEmail = req.email;
    const payload = {
        email: userEmail
    };
    
    try {
        const token = await sign(payload, SECRET, { expiresIn: 60 * 5 }); //create jwt token that expires in 5 minutes
        return res.status(200).cookie('token', token, { httpOnly: true }).json({ //send the user a cookie
            success: true,
            message: 'Reset request received'
        })
    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        });
    }
};

exports.resetPassword = async (req, res) => {
    const user = req.user;
    const id = user.id;
    const password = user.password;
    try {
        const hashedPassword = await hash(password, 10);
        await db.query(`UPDATE users SET password = $1 WHERE user_id = $2`, [hashedPassword, id]);
        return res.status(204).json({
            success: true,
            message: 'The password was updated successfully.'
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        });
    }
};
*/
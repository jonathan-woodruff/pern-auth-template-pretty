const { config } = require('dotenv');
config();

module.exports = {
    //server constants
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL,
    SERVER_URL: process.env.SERVER_URL,
    SECRET: process.env.SECRET,
    //database constants
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    //sso
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    COOKIE_KEY: process.env.COOKIE_KEY,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
};
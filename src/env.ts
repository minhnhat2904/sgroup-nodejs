
require('dotenv').config({});

export default {
    PORT: process.env.PORT,
    DB_CONNECTION : process.env.DB_CONNECTION,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
}

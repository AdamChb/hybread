require("dotenv").config();

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE

const serv = { host, user, password, database }

module.exports = serv;
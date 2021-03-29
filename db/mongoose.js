const mongoose = require("mongoose");

const { Mongodb } = require("../config.js");

module.exports = (username, password) => {
    if (username && password) {
        Object.assign(defaultConfig, { username, password });
    }
    return new Promise((resolve, reject) => {
        const { host, port, database, username, password } = Mongodb;

        let URI = `mongodb://`;

        if (username && password) {
            URI += `${username}:${password}@`;
        }

        URI += `${host}:${port}/${database}`;
        if (username && password) {
            URI += `?authSource=admin`;
        }




        mongoose.connect(
            URI,
            { useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true },

        );
        mongoose.connection.once("open", () => {
            console.log(`Database is connecting at ${URI}`);
            resolve()
        });
        mongoose.connection.on("error", (err) => {
            reject(err);
        });
    });
};
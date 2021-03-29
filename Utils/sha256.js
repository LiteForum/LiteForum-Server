const crypto = require("crypto");

let sha256 = (data) => {
    let sha256 = crypto.createHash('sha256');
    return sha256.update(data).digest('hex');
}

module.exports = sha256
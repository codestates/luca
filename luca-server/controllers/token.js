const bcrypt = require('bcrypt');

module.exports = {
    hashedpassword: (password) => {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    }
};
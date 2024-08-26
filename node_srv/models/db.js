const createSSHConnection = require('../config/sshConfig');

let db;

const connectToDB = async () => {
    if (!db) {
        db = await createSSHConnection();
    }
    return db;
};

module.exports = connectToDB;

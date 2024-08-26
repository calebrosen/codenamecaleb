const { Client } = require('ssh2');
const mysql = require('mysql2');

const sshConfig = {
    host: process.env.SSH_HOST,
    port: process.env.SSH_PORT || 22,
    username: process.env.SSH_USER,
    password: process.env.SSH_PASSWORD
};

const dbServer = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const createSSHConnection = () => {
    return new Promise((resolve, reject) => {
        const sshClient = new Client();
        sshClient.on('ready', () => {
            sshClient.forwardOut(
                '127.0.0.1', // source IP
                3306, // source port
                dbServer.host, // destination IP
                dbServer.port, // destination port
                (err, stream) => {
                    if (err) {
                        sshClient.end();
                        return reject(err);
                    }
                    const connection = mysql.createConnection({
                        ...dbServer,
                        stream
                    });

                    connection.connect((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log('Database connected over SSH tunnel');
                            resolve(connection);
                        }
                    });
                }
            );
        }).connect(sshConfig);
    });
};

module.exports = createSSHConnection;

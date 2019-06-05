const http = require("http");
const mysql = require("./modules/mysql-client");

// Make sure uncaught exceptions are logged on exit
process.on("uncaughtException", err => {
    console.error("Uncaught exception", err, err.stack);
    process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

let app = require("./application");

function start() {
    return Promise.all([
        connectToDatabase(),
    ]).then(
            ([dbcon]) => app.init({dbcon}) //Send perameters to app here
        )
        .catch(error => {
            console.error("Failed to get required connections", error);
            process.exit(1);
        });
}

function connectToDatabase() {
    return new Promise((resolve, reject) => {
        resolve(mysql);
    });
}

const port = process.env.PORT;
const server = http.createServer(app);
server.start = start;

server.start().then(() => {
    server.listen(port, () => {
        console.log(`server started`);
        console.log("Port:", port);
        console.log("URL:", `http://localhost:${port}`);
    });
});

let currentApp = app;


module.exports = server;

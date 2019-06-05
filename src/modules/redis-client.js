const redis = require("redis");
const { promisify } = require("util");
const client = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST
);

client.on("connect", function() {
    console.log("Redis client connected");
    console.log("Redis host: ", process.env.REDIS_HOST);
});

client.on("error", function(err) {
    console.log("Something went wrong " + err);
});

module.exports = {
    ...client,
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
    delAsync: promisify(client.del).bind(client),
    keysAsync: promisify(client.keys).bind(client)
};

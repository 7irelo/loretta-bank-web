const redis = require('redis');

// Create a Redis client and connect to the Redis server
const redisClient = redis.createClient({
  socket: {
    host: 'localhost',
    port: 6379
  }
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch((err) => console.error('Error connecting to Redis:', err));

module.exports = redisClient;

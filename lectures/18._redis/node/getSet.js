import redis from 'redis';

const redisClient = redis.createClient();


redisClient.on('error', (err) => {
    console.log('Error ' + err);
    }
);

redisClient.on('connect', () => {
    console.log('Redis client connected');
    }
);

await redisClient.connect();

redisClient.set('key', 'value', redis.print);
const value = await redisClient.get('key');
console.log(value)
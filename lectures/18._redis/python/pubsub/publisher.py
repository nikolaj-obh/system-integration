import redis

redisClient = redis.Redis(host='localhost', port=6379, db=0)

redisClient.publish("myChannel", "Hello World!")
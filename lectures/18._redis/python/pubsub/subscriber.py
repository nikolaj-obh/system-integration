import redis

redisClient = redis.Redis(host='localhost', port=6379, db=0)

pubsub = redisClient.pubsub()
pubsub.subscribe("myChannel")

for message in pubsub.listen():
    print(message)


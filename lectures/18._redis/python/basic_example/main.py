import redis

redis_client = redis.Redis(host='localhost', port=6379, db=0)

redis_client.set("myKey", "my Value")
print(redis_client.get("myKey"))
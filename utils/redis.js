const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Log any errors
    this.client.on('error', (error) => {
      console.error(`Redis Client Error: ${error}`);
    });
  }

  /**
   * Check if the Redis client is alive and connected.
   * @returns {boolean} True if connected, otherwise false.
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Get a value from Redis by key.
   * @param {string} key - The key to retrieve the value for.
   * @returns {Promise<string|null>} The value stored in Redis or null if not found.
   */
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  /**
   * Set a value in Redis with an expiration.
   * @param {string} key - The key to set.
   * @param {string} value - The value to store.
   * @param {number} duration - Expiration time in seconds.
   * @returns {Promise<void>} Resolves when the value is set.
   */
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Delete a value in Redis by key.
   * @param {string} key - The key to delete.
   * @returns {Promise<void>} Resolves when the value is deleted.
   */
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;


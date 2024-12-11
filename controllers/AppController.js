const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  /**
   * Handles GET /status
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   */
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  /**
   * Handles GET /stats
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   */
  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    res.status(200).json({ users, files });
  }
}

module.exports = AppController;

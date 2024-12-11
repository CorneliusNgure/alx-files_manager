const crypto = require('crypto');
const dbClient = require('../utils/db');

class UsersController {
  /**
   * Handles POST /users
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   */
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if email already exists
    const existingUser = await dbClient.db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash password
    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    // Insert new user into the database
    const newUser = {
      email,
      password: hashedPassword,
    };

    const result = await dbClient.db.collection('users').insertOne(newUser);

    // Return response with only the email and id
    res.status(201).json({
      id: result.insertedId,
      email: newUser.email,
    });
  }


   /**
   * Handles GET /users/me
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   */
  static async getMe(req, res) {
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await dbClient.db.collection('users').findOne({ _id: dbClient.mongo.ObjectId(userId) });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.status(200).json({ id: user._id, email: user.email });
  }
}

module.exports = UsersController;

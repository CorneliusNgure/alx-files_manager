const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Environment variables or default values
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Connection URI and options
    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    // Connect to the database
    this.client.connect().then(() => {
      this.db = this.client.db(database);
    }).catch((error) => {
      console.error(`MongoDB Client Error: ${error}`);
    });
  }

  /**
   * Check if the MongoDB client is alive and connected.
   * @returns {boolean} True if connected, otherwise false.
   */
  isAlive() {
    return this.client && this.client.isConnected();
  }

  /**
   * Get the number of documents in the "users" collection.
   * @returns {Promise<number>} The number of documents.
   */
  async nbUsers() {
    if (!this.isAlive()) return 0;
    const collection = this.db.collection('users');
    return collection.countDocuments();
  }

  /**
   * Get the number of documents in the "files" collection.
   * @returns {Promise<number>} The number of documents.
   */
  async nbFiles() {
    if (!this.isAlive()) return 0;
    const collection = this.db.collection('files');
    return collection.countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;

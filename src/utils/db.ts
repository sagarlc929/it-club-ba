// db.ts
import mongoose from 'mongoose';
import { IServerConfig, config } from '../utils/config';

export class DatabaseUtil {
  private server_config: IServerConfig = config;
  constructor() {
    this.connectDatabase();
  }

  public async connectDatabase() {
    try {
      mongoose.set('debug', true); // Enable Mongoose debugging
      console.log('Attempting to connect to MongoDB...'); // Debugging message
      console.log(config.db_config.db);
      await mongoose.connect(config.db_config.db);
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }
}


import 'dotenv/config';

export interface IServerConfig {
  port: number;
  db_config: {
    db: string;
  }
}

export const config: IServerConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  db_config: {
    db: process.env.MONGO_URI || '',
  },
};


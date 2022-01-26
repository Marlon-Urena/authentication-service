import { Sequelize } from 'sequelize';
import { config } from "dotenv";

config();

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5433/chat-app', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});
export default sequelize;

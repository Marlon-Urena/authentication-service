import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index';

interface UserAttributes {
  uid: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
}

class UserModel extends Model<UserAttributes, UserAttributes> {}

UserModel.init(
  {
    uid: { type: DataTypes.STRING, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    firstName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    zipCode: { type: DataTypes.STRING, allowNull: true }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: 'user_account'
  }
);

(async () => {
  await UserModel.sync();
  // Code here
})();
export default UserModel;

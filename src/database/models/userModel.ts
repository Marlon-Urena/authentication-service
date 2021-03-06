import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index';

interface UserAttributes {
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

class UserModel extends Model<UserAttributes, UserAttributes> {
  public email!: string;

  public username!: string;

  public firstName!: string | null;

  public lastName!: string | null;

  public address!: string | null;

  public city!: string | null;

  public state!: string | null;

  public country!: string | null;

  public zipCode!: string | null;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    email: { type: DataTypes.STRING, primaryKey: true },
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
    tableName: 'user_account'
  }
);

// eslint-disable-next-line no-void
void (async () => {
  await UserModel.sync();
  // Code here
})();

export default UserModel;

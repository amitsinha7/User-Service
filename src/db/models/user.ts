import * as Sequelize from "sequelize";

interface UserAttributes {
  id?: string;
  firstName: string;
  lastName: string;
  emailId: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type UserInstance = Sequelize.Model<UserAttributes> & UserAttributes;

export default (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    emailId: { type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
  };
  return sequalize.define<UserInstance, UserAttributes>("User", attributes);
};

import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Profile extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Profile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      dateOfBirth: DataTypes.DATEONLY,
      avatarUrl: DataTypes.STRING(255),
    },
    { sequelize, modelName: "Profile", tableName: "profiles" }
  );

  return Profile;
};

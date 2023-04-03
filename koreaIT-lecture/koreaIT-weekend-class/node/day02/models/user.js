const { Model, UUIDV4, UUID, STRING } = require('sequelize');

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: UUID,
          unique: true,
          allowNull: false,
          defaultValue: UUIDV4,
          primaryKey: true,
        },

        email: {
          type: STRING(100),
          allowNull: false,
          unique: true,
          comment: '유저 이메일',
        },

        password: {
          type: STRING(100),
          allowNull: false,
          comment: '유저 비밀번호',
        },
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        timestamps: true,
        sequelize,
      }
    );
  }
};

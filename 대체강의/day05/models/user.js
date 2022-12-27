const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    unique: true,
                    comment: '이메일',
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    comment: '비밀번호',
                },
            },
            {
                modelName: 'User',
                tableName: 'users',
                charset: 'utf8mb4',
                createdAt: true,
                updatedAt: true,
                sequelize,
            }
        );
    }
}
module.exports = User;

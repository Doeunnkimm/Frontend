const Sequelize = require('sequelize');

class Todo extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    comment: '투두 제목',
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                    comment: '투두 내용',
                },
                state: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                    comment: '투두 완료여부',
                },
            },
            {
                modelName: 'Todo',
                tableName: 'todos',
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
                createdAt: true,
                updatedAt: true,
                sequelize,
            }
        );
    }
}
module.exports = Todo;

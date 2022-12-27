// user 테이블 만들기
// 제약조건이랑 스키마 설정

const Sequelize = require('sequelize');

// sequelize를 통해 연결된 DB에 쿼리문(SQL문) 없이
// 자동으로 만들 테이블에 관한 설정
class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            // 여기에 정보를 적어두면 됨
            {
                // 테이블 컬럼 스미카 및 제약조건
                // user테이블에 필요한 컬럼명
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
                // 테이블 정보
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

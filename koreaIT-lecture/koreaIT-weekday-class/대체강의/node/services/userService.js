const { User } = require('../models');
const bcrypt = require('bcrypt'); // 단방향 암호화, 복호화(복구)X, 값 비교만 가능
const passport = require('passport');
const jsonWebToken = require('jsonwebtoken');

const UserService = {
    async login(req, res, next) {
        await passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (info) {
                return res.status(400).json(info);
            }

            return req.login(user, async loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }

                const token = jsonWebToken.sign({ id: user.id }, 'secret');
                res.status(200).json({ message: 'success', data: { token } });
            });
        })(req, res, next);
    },
    logout() {},
    async register(req, res, next) {
        try {
            /*
                users 테이블의 컬럼
                email, password 
                ---> 프론트엔드 email, password을 req을 통해 받아야 함
                json 데이터는 req.body에 전달
            */
            console.log(req.body);
            const exUser = await User.findOne({
                // findOne은 sequalize에서 select문을 지원하는 함수
                where: { email: req.body.email },
            });
            // 중복된 아이디가 있다면
            if (exUser)
                return res.status(400).send('이미 가입된 이메일입니다.');
            const hashPassword = await bcrypt.hash(req.body.password, 12);
            // 12: 암호화의 단계를 의미
            // 높을수록 보안면에서는 좋지만, 성능은 감소. 보통 8~12로 작업
            await User.create({
                email: req.body.email,
                password: hashPassword,
            });
            res.status(200).json({ message: 'success' });
        } catch (err) {
            next(err);
        }
    },
};

module.exports = UserService;

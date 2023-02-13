module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['eslint:recommended'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-var': 'error',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        // console에서 warn과 error를 제외한 나머지 log는 에러
        eqeqeq: 'error',
        // 일치 비교 연산자 ===
        'no-unused-vars': 'error',
        // 사용하지 않는 변수 선언 금지
    },
};

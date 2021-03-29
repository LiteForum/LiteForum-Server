module.exports = {
    root: true,
    env: {
        'browser': true,
        'es6': true,
    },
    extends: ['eslint:recommended', 'plugin:vue/essential'],
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/no-parsing-error': [
            2,
            {
                'x-invalid-end-tag': false
            }
        ],
        'no-undef': 'off',
        'camelcase': 'off',
        'comma-dangle': [2, 'always-multiline'],
        'no-unused-vars': 'off',
        // 关闭语句强制分号结尾
        semi: [0],
        'comma-dangle': [0]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
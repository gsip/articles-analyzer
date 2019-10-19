const commonConfig = require('@reservoir-dogs/build').eslint;

module.exports = {
    ...commonConfig,
    "extends": [
        ...commonConfig.extends,
        'react-app',
        'plugin:react/recommended',
    ]
};

const commonConfig = require('@reservoir-dogs/project-config').eslint;

module.exports = {
    ...commonConfig,
    "extends": [
        ...commonConfig.extends,
        'react-app',
        'plugin:react/recommended',
    ]
};

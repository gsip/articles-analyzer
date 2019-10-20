const commonConfig = require('@reservoir-dogs/project-config').eslint;

module.exports = {
    ...commonConfig,
    env: {
        ...commonConfig.env,
        webextensions: true,
    }
};

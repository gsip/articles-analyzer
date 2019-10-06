const commonConfig = require('@reservoir-dogs/build').eslint;

module.exports = {
    ...commonConfig,
    env: {
        ...commonConfig.env,
        webextensions: true,
    }
};

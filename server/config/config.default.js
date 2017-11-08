'use strict';

const path = require('path')

module.exports = appInfo => {
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1506306015485_9083';

    // add your config here
    config.middleware = [];

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.nj': 'nunjucks',
        }
    };

    config.multipart = {
        fileSize: '256mb'
    };

    config.resource = {
        path: path.join(appInfo.root, 'resource')
    };

    return config;
};

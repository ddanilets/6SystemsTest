if (!process.env.NODE_ENV)
    throw new Error("NODE_ENV variable is undefined. Should be \"production\" or \"development\"");
console.log("building " + process.env.NODE_ENV + " bundle");
module.exports = process.env.NODE_ENV == 'production' ? require('./webpack.prod-config.js') : require('./webpack.dev-config.js');
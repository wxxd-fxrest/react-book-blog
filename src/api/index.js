const Router = require('koa-router');
const posts = require('./posts');
const api = new Router();

api.use('/posts', posts.routes()); 

module.exports = api; // 라우터를 내보냅니다. 

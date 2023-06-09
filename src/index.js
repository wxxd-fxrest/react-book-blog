// import Koa from 'koa'; 
// import bodyParser from 'koa-bodyparser';
// import Router from 'koa-router';
// import mongoose from 'mongoose';
// import api from './api';

const Koa = require('koa'); 
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const mongoose = require('mongoose');
const api = require('./api');
require('dotenv').config();


// 비구조화 할당을 통해 process.env 내부 값에 대한 래퍼런스 만들기
const {PORT, MONGO_URI} = process.env; 

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(e => {
        console.log(e);
    }); 

const app = new Koa(); 
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용 

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());


// PORT가 지정되어 있지 않다면 4000을 사용 
const port = PORT || 4000; 
app.listen(4000, () => {
    console.log('Listening to port %d', port);
});
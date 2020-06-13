require('dotenv').config();

import koa from 'koa'; // import ,export >> esm 설치시 가능
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
// import createFakeData from './createFakeData';
import jwtMiddelware from './lib/jwtMiddleware';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';
import { async } from '../node_modules/rxjs/internal/scheduler/async';

const { PORT, MONGO_URI } = process.env; // ../env 적용
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
    // createFakeData();
  })
  .catch((e) => {
    console.error(e);
  });

const app = new koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = '홈';
});

router.get('/about/:name', (ctx) => {
  const { name } = ctx.params;
  ctx.body = name ? `${name}의 소개` : '소개';
});

router.get('/posts', (ctx) => {
  const { id } = ctx.query;
  ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
});

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddelware);

app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(
  __dirname,
  '../../../27_blog-frontend/build',
);

app.use(serve(buildDirectory));
app.use(async (ctx) => {
  //Not Found되고, 주소가 /api로 시작하지 않는 경우
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    //index.html 내용을 반환
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});

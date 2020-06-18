import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";

const app = express();

const serverRender = (req, res, next) => {
  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고
  res.send(root); // 클라이언트에게 결과물을 응답
};

app.use(serverRender);

app.listen;

// const html = ReactDOMServer.renderToString(
//   /* 이 함수에 jsx를 넣어서 호출하면 렌더링 결과를 문자열로 변환 */
//   <div>Hello Server Side Rendering!!</div>
// );

// console.log(html);

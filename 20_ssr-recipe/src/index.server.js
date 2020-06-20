import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import path from "path";

import fs from "fs"; // 파일 시스템

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer, { rootSaga } from "./modules";

import PreloadContext from "./lib/PreloadContext";

// Preloader를 통해 호출한 함수들이 Promise를 반환하지 않기에 미들웨어 생성
import createSagaMiddleware from "redux-saga";
import { END } from "redux-saga";

import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

const statsFile = path.resolve("./build/loadable-stats.json");

/* Loadable Components를 통해 파일 경로를 조회 하므로 생략 
// asset-manifest.json에서 파일 경로들을 조회
const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf-8")
);

const chunks = Object.keys(manifest.files)
  .filter((key) => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 키를 찾아서
  .map((key) => `<script src="${manifest.files[key]}"></script>`) // 스크립트 태그로 변환하고
  .join(""); // 합침
*/

// function createPage(root, tags) { // 브라우저에서 재사용 하려면 현재 스토어 상태를 문자열로 변환한 뒤, 스크립트로 주입해야 한다/.
// function createPage(root, stateScript) {
//   return `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="utf-8" />
//       <link rel="shortcut icon" href="/favicon.ico" />
//       <meta
//         name="viewport"
//         content="width=device-width,initial-scale=1,shrink-to-fit=no"
//       />
//       <meta name="theme-color" content="#000000" />
//       <title>React App</title>
//       <link href="${manifest.files["main.css"]}" rel="stylesheet" />
//     </head>
//     <body>
//       <noscript>You need to enable JavaScript to run this app.</noscript>
//       <div id="root">
//         ${root}
//       </div>
//       ${stateScript}
//       <script src="${manifest.files["runtime-main.js"]}"></script>
//       ${chunks}
//       <script src="${manifest.files["main.js"]}"></script>
//     </body>
//     </html>
//       `;
// }

function createPage(root, tags) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <title>React App</title>
      ${tags.styles}
      ${tags.links}
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        ${root}
      </div>
      ${tags.scripts}
    </body>
    </html>
      `;
}

const app = express();

const serverRender = async (req, res, next) => {
  const context = {};
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, sagaMiddleware)
  );

  const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();

  const preloadContext = {
    done: false,
    promises: [],
  };

  // 필요한 파일을 추출하기 위한 ChunkExtractor
  const extractor = new ChunkExtractor({ statsFile });

  const jsx = (
    <ChunkExtractorManager extractor={extractor}>
      <PreloadContext.Provider valuse={preloadContext}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </PreloadContext.Provider>
    </ChunkExtractorManager>
  );

  ReactDOMServer.renderToStaticMarkup(jsx); // renderToStaticMarkup으로 한번 렌더링한다. >> 정적인 페이지를 만들때 사용
  store.dispatch(END); // 별도에 작없을 하지 않으면 Promise가 끝나지 않아 만들어줌
  try {
    await sagaPromise; //기존에 진행 중이던 사가들이 모두 끝날 때까지 대기
    await Promise.all(preloadContext.promises); // 모든 프로미스를 기다린다
  } catch (e) {
    return res.status(500);
  }
  preloadContext.done = true;

  const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고

  // json을 문자열로 바꾸고, 악성스크립트가 발생되는 것을 방지 하기 위해 <(미만) 를 치환 {\u003E(초과) >}
  const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
  // 리덕스 초기 상태를 스크립트로 주입
  const stateScript = `<script>__PRELOADED_STATE__=${stateString}</script>`;

  // 미리 불러와야 하는 스타일/스크립트 추출
  const tags = {
    scripts: stateScript + extractor.getScriptTags(), // 스크립트 앞부분에 리덕스 상태 넣기
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags(),
  };

  res.send(createPage(root, tags)); // 결과물을 응답

  // res.send(createPage(root, stateScript)); // 결과물을 응답
  // res.send(root); // 클라이언트에게 결과물을 응답
  // res.send(createPage(root)); // 클라이언트에게 결과물을 응답
};

const serve = express.static(path.resolve("./build"), {
  index: false, // "/" 경로에서 index.html을 보여 주지 않도록 설정
});

app.use(serve);
app.use(serverRender);

app.listen(5000, () => {
  console.log("Running on http://localhost:5000");
});

// const html = ReactDOMServer.renderToString(
//   /* 이 함수에 jsx를 넣어서 호출하면 렌더링 결과를 문자열로 변환 */
//   <div>Hello Server Side Rendering!!</div>
// );

// console.log(html);

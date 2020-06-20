import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer, { rootSaga } from "./modules";
import createSagaMiddleware from "redux-saga";
import { loadableReady } from "@loadable/component";

const sagaMiddleware = createSagaMiddleware(); // (redux-saga) 스토어를 생성할 미들 웨어 적용

const store = createStore(
  rootReducer,
  window.__PRELOADED_STATE__, // 브라우저에서 상태를 재사용 할 때, 스토어 생성과정에서 초기값으로 사용됨
  applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// ReactDOM.render(
const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};
// );
// document.getElementById("root")
const root = document.getElementById("root");

// 프로덕션 환경에서는 loadableReady와 hydrate을 사용하고
// 개발 환경에서는 기존 방식으로 처리
if (process.env.NODE_ENV === "production") {
  loadableReady(() => {
    ReactDOM.hydrate(<Root />, root);
  });
} else {
  ReactDOM.render(<Root />, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

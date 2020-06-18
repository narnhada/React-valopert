import React from "react";
import ReactDOMServer from "react-dom/server";

const html = ReactDOMServer.renderToString(
  /* 이 함수에 jsx를 넣어서 호출하면 렌더링 결과를 문자열로 변환 */
  <div>Hello Server Side Rendering!!</div>
);

console.log(html);

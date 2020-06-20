import { createContext, useContext } from "react";

/*  '요청이 끝날 때까지 대기 했다가 다시 렌더링 하기위해...' 
    기다려야하는 promise가 있다면 수집하고, 수집된 promise들이 끝날 때까지 기다렸다가
    다시 렌더링 될 때 데이터가 채워진 상태로 컴포넌트들이 나타난다
*/

// 서버 환경: {done: false, promise: [] }
// 클라이언트 환경: null
const PreloadContext = createContext(null);
export default PreloadContext;

// resolve는 함수 타입임
export const Preloader = ({ resolve }) => {
  const preloadContext = useContext(PreloadContext);
  if (!preloadContext) return null; // 유효하지 않으면 아무것도 하지 않음
  if (preloadContext.done) return null; // 이미 작업이 끝났다면 아무것도 하지않음

  // resolve 함수가 promise를 반환하지 않아도, promise취급을 하기 위해 Promise.resolve 함수 사용
  preloadContext.promises.push(Promise.resolve(resolve()));
  return null;
};

// usePreloader로 커스텀 Hook함수를 만듬
export const usePreloader = (resolve) => {
  const preloadContext = useContext(PreloadContext);
  if (!preloadContext) return null;
  if (preloadContext.done) return null;
  preloadContext.promises.push(Promise.resolve(resolve()));
};

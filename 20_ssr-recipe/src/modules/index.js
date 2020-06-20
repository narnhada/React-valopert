import { combineReducers } from "redux";
import users, { usersSaga } from "./users";
import { all } from "redux-saga/effects";

// 리덕스 스토어에 redux-saga적용
export function* rootSaga() {
  yield all([usersSaga()]);
}

const rootReducer = combineReducers({ users });
export default rootReducer;

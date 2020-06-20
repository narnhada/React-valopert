// 컨테이너 컴포넌트

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import User from "../components/User";
// import { Preloader } from "../lib/PreloadContext";
import { usePreloader } from "../lib/PreloadContext";
import { getUser } from "../modules/users";

const UserContainer = ({ id }) => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  usePreloader(() => dispatch(getUser(id)));

  useEffect(() => {
    if (user && user.id === parseInt(id, 10)) return; // 사용자가 존재하고, id가 일치하면 요청하지 않음
    dispatch(getUser(id)); // 이부분이 없으면 rendering안됨
  }, [dispatch, id, user]); // id가 바뀔 때 새로 요청해야 함

  // 컨테이너 유효성 검사 후 return null을 해야 하는 경우에
  // null 대신 Preloader 반환
  //   if (!user) {
  //     return <Preloader resolve={() => dispatch(getUser(id))} />;
  //   }
  if (!user) return null;
  return <User user={user} />;
};

export default UserContainer;
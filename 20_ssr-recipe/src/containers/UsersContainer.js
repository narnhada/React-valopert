import React from "react";
import Users from "../components/Users";
import { connect } from "react-redux";
import { getUsers } from "../modules/users";
import { Preloader } from "../lib/PreloadContext";

const { useEffect } = React;

const UserContainer = ({ users, getUsers }) => {
  // 컴포넌트가 마운트되고 호출
  useEffect(() => {
    if (users) return; // users가 이미 유효하다면 요청하지 않음
    getUsers();
  }, [getUsers, users]);
  return (
    <>
      <Users users={users} />
      <Preloader resolve={getUsers} />
    </>
  );
};

export default connect(
  (state) => ({
    users: state.users.users,
  }),
  {
    getUsers,
  }
)(UserContainer); // connect() 두 번째 파라미터를 제공하지 않을때 default dispatch,지금은 UserContainer에 적용

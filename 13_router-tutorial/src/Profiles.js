import React from "react";
import { Route, NavLink } from "react-router-dom";
import Profile from "./Profile";
// import WithRouterSample from "./WithRouterSample";

const Profiles = () => {
  const activeStyle = {
    background: "#48f0e7",
    color: "black",
  };
  return (
    <div>
      <h3>사용자 목록</h3>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/hi">
            하이 프로필
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/hey">
            헤이 프로필
          </NavLink>
        </li>
      </ul>
      <Route
        path="/profiles"
        exact
        render={() => <dif>사용자를 선택해 주세요</dif>}
      />
      <Route path="/profiles/:username" component={Profile} />

      {/* <WithRouterSample /> */}
    </div>
  );
};

export default Profiles;

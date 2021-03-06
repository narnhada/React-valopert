import React from "react";
import { withRouter } from "react-router-dom";
import WithRouterSample from "./WithRouterSample";

const data = {
  hi: {
    name: "hi",
    description: " 하이 ",
  },
  hey: {
    name: "hey",
    description: " 헤이 ",
  },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재 하지 않는 사람입네다.</div>;
  }
  return (
    <div>
      <h3>
        {username} : {profile.name}
      </h3>
      <p>{profile.description}</p>
      <WithRouterSample />
    </div>
  );
};

export default withRouter(Profile);

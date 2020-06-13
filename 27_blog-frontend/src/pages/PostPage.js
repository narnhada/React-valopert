import React from 'react';
// import PostViewer from '../components/post/PostViewer';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';



const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostViewerContainer />
      {/* <PostViewer /> */}
    </>
  );
};

export default PostPage;

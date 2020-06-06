import React from 'react';
// import Header from '../components/common/Header';
// import PostList from '../components/post/PostList'
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostListContainer />
      {/* <Header /> */}
      {/* <PostList /> */}
    </>
  );
};

export default PostListPage;

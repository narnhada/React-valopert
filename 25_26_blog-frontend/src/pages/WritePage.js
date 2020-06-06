import React from 'react';
// import Editor from '../components/write/Editor';
// import TagBox from '../components/write/TagBox';
// import WriteActionButtons from '../components/write/WriteActionButtons';

import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';

const WritePage = () => {
  return (
    <Responsive>
      {/* <Editor /> */}
      {/* <TagBox /> */}
      {/* <WriteActionButtons /> */}
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;

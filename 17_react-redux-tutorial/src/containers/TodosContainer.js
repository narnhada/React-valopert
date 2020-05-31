// import { connect } from 'react-redux';
import { useSelector, useDispatch } from "react-redux";
import React, { useCallback } from "react";
import { changeInput, insert, toggle, remove } from "../modules/todos";
import Todos from "../componensts/Todos";
// import useActions from "../lib/useActions";

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  // const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
  //   [changeInput, insert, toggle, remove],
  //   []
  // );

  const dispach = useDispatch();
  const onChangeInput = useCallback((input) => dispach(changeInput(input)), [
    dispach,
  ]);
  const onInsert = useCallback((text) => dispach(insert(text)), [dispach]);
  const onToggle = useCallback((id) => dispach(toggle(id)), [dispach]);
  const onRemove = useCallback((id) => dispach(remove(id)), [dispach]);

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

export default React.memo(TodosContainer);
// const TodosContainer = ({
//   input,
//   todos,
//   changeInput,
//   insert,
//   toggle,
//   remove,
// }) => {
//   return (
//     <Todos
//       input={input}
//       todos={todos}
//       onChangeInput={changeInput}
//       onInsert={insert}
//       onToggle={toggle}
//       onRemove={remove}
//     />
//   );
// };

// export default connect(
//   ({ todos }) => ({
//     input: todos.input,
//     todos: todos.todos,
//   }),
//   {
//     changeInput,
//     insert,
//     toggle,
//     remove,
//   }
// )(TodosContainer);

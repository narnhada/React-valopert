import React, { useState } from "react"; //Component, Suspense
import logo from "./logo.svg";
import "./App.css";

/* 이렇게 import 하면 main 안으로 들어가서 main이 실행 될때 같이 호출되서 좋이 않다*/
// import notify from "./notify";

/* 1. */
// const SplitMe = React.lazy(() => import("./SplitMe"));
// function App() {
//   const [visible, setVisible] = useState(false);
//   const onClick = () => {
//     setVisible(true);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p onClick={onClick}>Hello React</p>
//         <Suspense fallback={<div>loading...</div>}>
//           {visible && <SplitMe />}
//         </Suspense>
//       </header>
//     </div>
//   );
// }

/*2. */
// const onClick = () => {
//   import("./notify").then((result) => result.default());
// };

// class App extends Component {
//   state = {
//     SplitMe: null,
//   };

//   handleClick = async () => {
//     const loadedModule = await import("./SplitMe");
//     this.setState({
//       SplitMe: loadedModule.default,
//     });
//   };

//   render() {
//     const { SplitMe } = this.state;
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p onClick={this.handleClick}>Hello React</p>
//           {SplitMe && <SplitMe />}
//         </header>
//       </div>
//     );
//   }
// }

/*3. loadable components, preload */

import loadable from "@loadable/component";
const SplitMe = loadable(() => import("./SplitMe"), {
  fallback: <div>loading...</div>,
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };

  const onMouseOver = () => {
    SplitMe.preload(); /*마우스에 올리기만 해도 나옴 */
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onMouseOver}>
          Hello React
        </p>
        {visible && <SplitMe />}
      </header>
    </div>
  );
}

export default App;

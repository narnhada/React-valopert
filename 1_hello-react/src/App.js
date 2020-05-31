// import React from "react";
import React, { Component } from "react";
// import MyComponent from "./MyComponent";
// import Counter from "./Counter";
// import Say from "./say";
// import EventPractice from "./EventPractice";
// import EventPractice2 from "./EventPractice_2";
// import ValidationSample from "./ValidationSample";
// import ScrollBox from "./ScrollBox";
// import IterationSample from "./iterationSample";
import LifeCycleSample from "./LifeCycleSample";
import ErrorBoundary from "./ErrorBoundary";

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: "#000000",
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤색상</button>
        <ErrorBoundary>
          <LifeCycleSample color={this.state.color} />
        </ErrorBoundary>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div>
//       <LifeCycleSample />
//     </div>
//   );
// }
export default App;

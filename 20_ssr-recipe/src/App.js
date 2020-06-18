import React from "react";
import "./App.css";
import { Route } from "react-router-dom";

import Menu from "./components/Menu";
import RedPage from "./pages/RedPage";
import BluePage from "./pages/BluePage";

function App() {
  return (
    <div>
      <Menu />
      <hr />
      <Route path="/Red" component={RedPage} />
      <Route path="/Blue" component={BluePage} />
    </div>
  );
}

export default App;

import React from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "Store/store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes />
      </Provider>
    </Router>
  );
}

export default App;

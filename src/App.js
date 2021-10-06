import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateRecipe from "./views/CreateRecipe";
import Recipies from "./views/Recipies";
import Home from "./views/Home";
import Header from "./components/header/Header";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route path="/recipes">
            <Recipies />
          </Route>
          <Route path="/create-recipe">
            <CreateRecipe />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

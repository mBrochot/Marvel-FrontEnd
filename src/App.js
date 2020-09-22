import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faPlus,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Characters from "./containers/Characters";
import Character from "./containers/Character";
import Comics from "./containers/Comics";
import Favorites from "./containers/Favorites";
import Home from "./containers/Home";

library.add(faTimes, faPlus, faArrowAltCircleLeft);

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/comics_:pageNumber">
            <Comics />
          </Route>
          <Route path="/characters_:pageNumber">
            <Characters />
          </Route>
          <Route path="/character_:pageNumber">
            <Character />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

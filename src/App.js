import React, { createContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MenuProvider from "./context/MenuContext";

import { UsrContext } from "./UserContext";

import Menu from "./components/Menu";
import Login from "./components/Login";
//import Start from "./pages/Start";
import ClientAdd from "./pages/ClientData";

import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

export const userContext = createContext();

const App = () => {
  const [data, setData] = useState({});

  return (
    <UsrContext.Provider value={{ data, setData }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <MenuProvider>
            <Route path="/clientdata/" component={ClientAdd} />
            <Route path="/menu" component={Menu} />
            {/* <Route path="/start" component={Start} /> */}
          </MenuProvider>
        </Switch>
      </BrowserRouter>
    </UsrContext.Provider>
  );
};

export default App;

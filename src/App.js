import React from "react";
import { Switch } from "react-router";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import Main from "./pages/Main";
import theme from "./utils/styles";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default App;

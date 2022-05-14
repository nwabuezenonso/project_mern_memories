// import react
import React from 'react';
// import container
import { Container } from '@material-ui/core';
// import browser router and switch
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import home component and other files
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

// App component for routing
const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Profile from './components/Profile';
import VirtualWorld from './components/VirtualWorld';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/virtual-world" component={VirtualWorld} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
npm start 
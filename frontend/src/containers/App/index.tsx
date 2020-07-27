import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer, Header } from '../../components/layout';
import Routes from '../../components/Routes';

const App = () => (
  <Router>
    <>
      <Header />
      <Routes />
      <Footer />
    </>
  </Router>
);

export default App;

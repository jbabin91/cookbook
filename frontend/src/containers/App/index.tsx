import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import CustomTheme from '../../styles/CustomTheme';
import { Header, Footer } from '../../components/layout';
import Routes from '../../components/Routes';

const App = () => (
  <ThemeProvider theme={CustomTheme}>
    <CSSReset />
    <Router>
      <>
        <Header />
        <Routes />
      </>
    </Router>
    <Footer />
  </ThemeProvider>
);

export default App;

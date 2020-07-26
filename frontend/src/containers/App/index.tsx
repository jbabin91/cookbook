import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer, Header } from '../../components/layout';
import Routes from '../../components/Routes';
import CustomTheme from '../../styles/CustomTheme';

const App = () => (
  <ThemeProvider theme={CustomTheme}>
    <CSSReset />
    <Router>
      <>
        <Header />
        <Routes />
        <Footer />
      </>
    </Router>
  </ThemeProvider>
);

export default App;

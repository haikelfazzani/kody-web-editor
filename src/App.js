import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import './styles/App.css';
import './styles/scroll.css';

import Home from './pages/Home';
import Footer from './components/Footer';

function App () {
  
  return (<>
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
    <Footer />
  </>);
}

export default App;
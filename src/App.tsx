import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './App.css';
import { AppRoute } from './routes/route';
// import LoginForm from './components/forms/LoginForm';
// import RegisterForm from './components/forms/RegisterForm';
import { StickyFooter } from './components/dashboard/stickyFooter';

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoute />
      </Router>
      <StickyFooter/>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './App.css';
import { AppRoute } from './routes/route';
// import LoginForm from './components/forms/LoginForm';
// import RegisterForm from './components/forms/RegisterForm';
import { CopyRight } from './components/dashboard/copyRight';
import { StickyFooter } from './components/dashboard/stickyFooter';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <nav>
          <ul>
            <li> <Link to={'/'}>Home</Link> </li>
            <li><Link to={'/login'}> Login</Link></li>
            <li> <Link to={'/register'}> Register</Link> </li>
            <li><Link to={'/katas'}>Katas</Link></li>
          </ul>
        </nav> */}
        <AppRoute />
      </Router>
      <StickyFooter/>
    </div>
  );
}

export default App;

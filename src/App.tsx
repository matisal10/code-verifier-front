import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/homePage';
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/registerPage';
import { KatasPages } from './pages/katasPages';
import { KataDetailsPage } from './pages/kataDetailsPage';
// import LoginForm from './components/forms/LoginForm';
// import RegisterForm from './components/forms/RegisterForm';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li> <Link to={'/'}>Home</Link> </li>
            <li><Link to={'/login'}> Login</Link></li>
            <li> <Link to={'/register'}> Register</Link> </li>
            <li><Link to={'/katas'}>Katas</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/katas' element={<KatasPages />}></Route>
          <Route path='/katas/:id' element={<KataDetailsPage />}></Route>
          <Route path='*' element={<Navigate to={'/'} replace />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

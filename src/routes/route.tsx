
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import { KatasPages } from '../pages/katasPages';
import { KataDetailsPage } from '../pages/kataDetailsPage';
export const AppRoute = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>
                <Route path='/katas' element={<KatasPages />}></Route>
                <Route path='/katas/:id' element={<KataDetailsPage />}></Route>
                <Route path='*' element={<Navigate to={'/'} replace />}></Route>
                <Route
                    path='*'
                    element={<Navigate to='/' replace />}>
                </Route>

            </Routes>
        </div>
    )
}
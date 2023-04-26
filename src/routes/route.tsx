
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import { KatasPages } from '../pages/katasPages';
import { KataDetailsPage } from '../pages/kataDetailsPage';
import { CreateKataPage } from '../pages/createKataPage';
import { EditPage } from '../pages/editKataPage';
import { MyKatasPages } from '../pages/myKatasPages';
import { ResolveKata } from '../pages/resolveKata';
export const AppRoute = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>
                <Route path='/katas' element={<KatasPages />}></Route>
                <Route path='/katas/create' element={<CreateKataPage />}></Route>
                <Route path='/katas/myKatas' element={<MyKatasPages />}></Route>
                <Route path='/katas/edit/:id' element={<EditPage />}></Route>
                <Route path='/katas/:id' element={<KataDetailsPage />}></Route>
                <Route path='/katas/:id/Resolve' element={<ResolveKata />}></Route>
                <Route path='*' element={<Navigate to={'/'} replace />}></Route>
                <Route
                    path='*'
                    element={<Navigate to='/' replace />}>
                </Route>

            </Routes>
        </div>
    )
}
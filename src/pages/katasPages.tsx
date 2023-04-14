import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';

export const KatasPages = () => {

    let loggedIn = useSessionStorage('sessionJWTToken')
    let navigate = useNavigate()

    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login')
        }
        
    }, [loggedIn])


    const navigateToKataDetail = (id: Number) => {
        navigate(`/katas/${id}`)
    }

    return (
        <div>
            <h1> Katas Pages</h1>
            <ul>
                <li onClick={() => navigateToKataDetail(1)}>First kata</li>
                <li onClick={() => navigateToKataDetail(2)}>Second kata</li>
            </ul>
        </div>
    )

}
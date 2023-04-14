import React, { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage';

export const KataDetailsPage = () => {
    let { id } = useParams()
    let loggedIn = useSessionStorage('sessionJWTToken')
    let navigate = useNavigate()

    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login')
        }
        
    }, [loggedIn])

    return (
        <div>
            <h1> Kata Details page: {id}</h1>
        </div>
    )

}
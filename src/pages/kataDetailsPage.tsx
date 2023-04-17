import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getDetails } from '../services/katasServices';
import { AxiosResponse } from 'axios';

export const KataDetailsPage = () => {
    let { id } = useParams()
    let loggedIn = useSessionStorage('sessionJWTToken')
    let navigate = useNavigate()
    const [details, setDetails] = useState<any>()

    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login')
        }

    }, [loggedIn])

    const obtainDetails = () => {
        if (id) {
            getDetails(loggedIn, id).then((response: AxiosResponse) => {
                if (response.status === 200) {
                    setDetails(response.data);
                    // console.log(response.data);
                }
                else {
                    throw new Error('get error');
                }

            });
        }

    }
    useEffect(() => {
        obtainDetails()
    }, [])

    return (
        <div>
            {
                details ?
                    <div>
                        <h1> Name: {details.name}</h1>
                        <h2>Description: {details.description}</h2>
                        <h3>Level: {details.level}</h3>
                    </div>

                    :
                    <div></div>
            }

        </div>
    )

}
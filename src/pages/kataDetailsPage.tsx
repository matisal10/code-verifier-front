import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getDetails } from '../services/katasServices';
import { AxiosResponse } from 'axios';
import { Kata } from '../utils/types/kata.type';
import { Editor } from '../components/editor/editor';

export const KataDetailsPage = () => {
    let { id } = useParams()
    let loggedIn = useSessionStorage('sessionJWTToken')
    let navigate = useNavigate()
    const [details, setDetails] = useState<Kata>()
    const [showSolution, setShowSolution] = useState(true)

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
        if (!loggedIn) {
            return navigate('/login')
        }
        else {
            obtainDetails()
        }

    }, [loggedIn])

    return (
        <div>
            {
                details ?
                    <div>
                        <h1> Name: {details.name}</h1>
                        <h2>Description: {details.description}</h2>
                        <h3>Level: {details.level}</h3>
                        <button onClick={() => setShowSolution(!showSolution)}>
                            {showSolution ? "Show solution" : 'Hide solution'}
                        </button>
                        {
                            showSolution ? null : <Editor>{details?.solution}</Editor>
                        }
                    </div>

                    :
                    <div></div>
            }


        </div>
    )

}
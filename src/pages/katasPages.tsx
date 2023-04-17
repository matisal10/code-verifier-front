import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';

import { GetAllKatas } from '../services/katasServices';
import { AxiosResponse } from 'axios';

export const KatasPages = () => {

    let loggedIn = useSessionStorage('sessionJWTToken')
    let navigate = useNavigate()
    const [katasArray, setKatasArray] = useState([])

    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login')
        }

    }, [loggedIn])

    const getKatas = () => {
        GetAllKatas(loggedIn).then((response: AxiosResponse) => {
            if (response.status === 200) {
                setKatasArray(response.data.katas);
                // console.log(katasArray);
            }
            else {
                throw new Error('get error');
            }

        });
    }
    useEffect(() => {
        getKatas()
    }, [])



    const navigateToKataDetail = (id: Number) => {
        navigate(`/katas/${id}`)
    }

    return (
        <div>
            <h1> Katas Pages</h1>
            {katasArray.map((kata: any, index) =>
            (
                <div key={index}>
                    <li onClick={() => navigateToKataDetail(kata._id)}>name:{kata.name}</li>
                    {/* <h4></h4> */}
                </div>
            )
            )
            }


        </div>
    )

}
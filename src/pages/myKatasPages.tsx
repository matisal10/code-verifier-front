import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getMykatasById } from '../services/katasServices';
import { AxiosResponse } from 'axios';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
export const MyKatasPages = () => {

    let id = useSessionStorage("idUser")
    let loggedIn = useSessionStorage('sessionJWTToken')
    let navigate = useNavigate()

    const [katas, setKatas] = useState([])

    const getKatas = () => {
        if (id) {
            getMykatasById(loggedIn, id).then((response: AxiosResponse) => {
                if (response.status === 200) {
                    setKatas(response.data.katas);
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
            getKatas()
        }

    }, [loggedIn])

    const navigateToKataDetail = (id: Number) => {
        navigate(`/katas/${id}`)
    }
    const editKata = (id: string) => {
        navigate(`/katas/edit/${id}`)
    }

    return (
        <div>
            <h1>My Katas </h1>
            {
                katas.length > 0 ?

                    katas.map((kata: any, index) =>
                    (
                        <div key={index}>
                            <div>
                                <a style={{ 'cursor': "pointer" }} onClick={() => navigateToKataDetail(kata._id)}>name: {kata.name}</a>
                                <Button onClick={() => editKata(kata._id)}><EditIcon /></Button>
                                {/* <Button style={{ background: "none", cursor: "pointer" }} onClick={() => deleteKata(kata, {
                            vertical: 'top',
                            horizontal: 'center',
                        })} ><DeleteForeverIcon />
                            <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={open}
                                autoHideDuration={2000}
                                onClose={handleClose}
                                message="kata Eliminada correctamente"
                                key={vertical + horizontal}
                            />
                        </Button> */}
                            </div>
                        </div>
                    )
                    )
                    :
                    <div>
                        No katas found
                    </div>
            }</div>
    )
}

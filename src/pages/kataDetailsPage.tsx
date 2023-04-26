import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage';
import { deleteKataByid, getDetails } from '../services/katasServices';
import { AxiosResponse } from 'axios';
import { Kata } from '../utils/types/kata.type';
import { Editor } from '../components/editor/editor';
import { Button } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export interface State extends SnackbarOrigin {
    open: boolean;
}

export const KataDetailsPage = () => {
    let { id } = useParams()
    let creatorId = useSessionStorage("idUser")
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

    const editKata = (kata: any) => {
        if (kata._id) {
            navigate(`/katas/edit/${id}`)
        }
        else {
            return alert(`problem: ${id}`)
        }
    }

    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const deleteKata = async (kata: Kata, newState: SnackbarOrigin) => {
        if (kata.creator === creatorId && kata._id) {
            await deleteKataByid(loggedIn, kata._id, creatorId).then((response: AxiosResponse) => {
                // console.log(id, creatorId)
                if (response.status === 200) {
                    setState({ open: true, ...newState });
                    navigate("/katas")
                }
                else {
                    throw new Error('get error');
                }

            });
        }

    }

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
                        <Button onClick={() => editKata(details)}><EditIcon /></Button>
                        <Button style={{ background: "none", cursor: "pointer" }} onClick={() => deleteKata(details, {
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
                        </Button>
                        <Button onClick={()=>navigate(`/katas/${id}/resolve`)}>Send Solution</Button>
                    </div>

                    :
                    <div></div>
            }


        </div>
    )

}
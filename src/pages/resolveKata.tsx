import * as React from "react";
import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { NewEditor } from "../components/editor/newEditor";
import { sendSolution } from "../services/katasServices";


export const ResolveKata = () => {
    let loggedIn = useSessionStorage('sessionJWTToken')
    let creatorId = useSessionStorage("idUser")
    let { id } = useParams()
    let navigate = useNavigate()

    const [solution, setSolution] = useState('')

    const getSolution = (solution: string) => {
        setSolution(solution);
    };

    const ObtainsendSolution = async () => {
        if (solution === '') {
            return alert("la solucion no debe estar vacia")
        }
        else {
            if (id) {
                await sendSolution(loggedIn, id, solution).then((response: AxiosResponse) => {
                    if (response.data.status === 200) {
                        navigate(`/katas/${id}`)
                    }
                    else {
                        throw new Error('Invalid credentials')
                    }
                })
                    .catch((error) => console.error(`[CREATE ERROR]: Something went wrong: ${error}`))
            }
        }


    }

    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login')
        }

    }, [loggedIn])

    return (

        <div className="container">
            <NewEditor onData={getSolution} />
            <Button onClick={ObtainsendSolution}>Send solution</Button>
        </div>

    )

}
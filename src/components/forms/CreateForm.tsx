import * as React from "react";
import { useState } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { createKata } from '../../services/katasServices';
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";


export default function CreateForm() {
    
    let loggedIn = useSessionStorage('sessionJWTToken')
    let creatorId = useSessionStorage("idUser")
    let navigate = useNavigate()
    const [form, setForm] = useState<any>({
        name: "",
        description: "",
        level: "",
        solution: "",
        creator: creatorId,
        intents: 0,
        participants: [],
        valoration: 0,
        date: new Date(),
        num_valorations: 0
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setForm((prevForm:any) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await createKata(loggedIn,creatorId,form).then((response : AxiosResponse)=>{
            if(response.data.status === 200){
                navigate("/katas")
            }
            else{
                throw new Error('Invalid credentials')
            }
        })
        .catch((error) => console.error(`[CREATE ERROR]: Something went wrong: ${error}`))
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Descripción:
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                ></textarea>
            </label>
            <br />
            <label>
                Nivel:
                <select
                    name="level"
                    value={form.level}
                    onChange={handleInputChange}
                >
                    <option value="">Selecciona un nivel</option>
                    <option value="Basic">Basic</option>
                    <option value="Midle">Midle </option>
                    <option value="High">High </option>
                </select>
            </label>
            <br />
            <label>
                Solución:
                <textarea
                    name="solution"
                    value={form.solution}
                    onChange={handleInputChange}
                ></textarea>
            </label>
            <br />
            <button type="submit">Create</button>
        </form>
    );
}

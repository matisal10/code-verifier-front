import * as React from "react";
import { useEffect, useState } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { createKata, getDetails, updateKataById } from '../../services/katasServices';
import { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function EditForm() {
    let { id } = useParams()
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

    async function getKata() {
        if (id) {
            await getDetails(loggedIn, id).then((response: AxiosResponse) => {
                if (response.status === 200) {
                    setForm(response.data);
                }
                else {
                    throw new Error('get error');
                }

            });
        }
    }

    useEffect(() => {
        getKata();
    }, [])

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setForm((prevForm: any) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(form)
        if (id) {
            await updateKataById(loggedIn, id, form,creatorId).then((response: AxiosResponse) => {
                if (response.data.status === 200) {
                    navigate("/katas")
                }
                else {
                    throw new Error('Invalid credentials')
                }
            })
                .catch((error) => console.error(`[CREATE ERROR]: Something went wrong: ${error}`))
        }

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
            <button type="submit">Edit</button>
        </form>
    );


}

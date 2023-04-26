import * as React from "react";
import { useState } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { createKata } from '../../services/katasServices';
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { NewEditor } from "../editor/newEditor";
import './styles/createForm.scss'
import { Button, MenuItem, Select, TextField } from "@mui/material";


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
        setForm((prevForm: any) => ({
            ...prevForm,
            [name]: value,
        }));
    };
    const solution = (solution: string) => {
        setForm((prevForm: any) => ({
            ...prevForm,
            ['solution']: solution,
        }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await createKata(loggedIn, creatorId, form).then((response: AxiosResponse) => {
            if (response.data.status === 200) {
                navigate("/katas")
            }
            else {
                throw new Error('Invalid credentials')
            }
        })
            .catch((error) => console.error(`[CREATE ERROR]: Something went wrong: ${error}`))
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <label>
                
                <TextField
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    label="Name"
                />
            </label>
            <br />
            <label>
                
                <TextField
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    label="Description"
                ></TextField>
            </label>
            <br />
            <label>
                <Select
                    name="level"
                    value={form.level}
                    onChange={handleInputChange}
                    displayEmpty
                    label="Level"
                >
                    <MenuItem value="">Selecciona un nivel</MenuItem>
                    <MenuItem value="Basic">Basic</MenuItem>
                    <MenuItem value="Midle">Midle </MenuItem>
                    <MenuItem value="High">High </MenuItem>
                </Select>
            </label>
            <br />
            <label className="solution">
                Solution:
                {/* <textarea
                    name="solution"
                    value={form.solution}
                    onChange={handleInputChange}
                ></textarea> */}
                <div style={{ width: "300px", display: "flex", alignItems: 'center', }}>
                    <NewEditor onData={solution} />
                </div>
            </label>
            <br />
            <Button type="submit">Create</Button>
        </form>
    );
}

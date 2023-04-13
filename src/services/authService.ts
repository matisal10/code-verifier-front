import axiosConfig from "../utils/config/axios.config";

/**
 * 
 * @param {string} email to login a user
 * @param {string} password to login a user
 * @returns 
 */

export const login = (email: string, password: string) => {
    let body = {
        email,
        password
    }

    //send post request to login endpoint
    return axiosConfig.post("/auth/login", body)
}

/**
 * register method
 * @param {string} email 
 * @param {string} password 
 * @param {string} name 
 * @param {number} edad 
 * @returns 
 */
export const register = (email: string, password: string, name: string, edad: number) => {
    let body = {
        email,
        password,
        name,
        edad,
    }

    //Send post request to register endpoint
    return axiosConfig.post("/auth/register",body)
}
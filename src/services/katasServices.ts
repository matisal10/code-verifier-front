import axiosConfig from "../utils/config/axios.config";

export const GetAllKatas = (token: string) => {

    //send get request to login endpoint
    return axiosConfig.get("/kata", {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        }
    })
}

export const getDetails = (token: string, id: string) => {
    return axiosConfig.get(`/kata?id=${id}`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        }
    })
}
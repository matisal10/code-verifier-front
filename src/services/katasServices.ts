import axiosConfig from "../utils/config/axios.config";
import { Kata } from "../utils/types/kata.type";

export const GetAllKatas = (token: string, page: number) => {

    //send get request to login endpoint
    return axiosConfig.get("/kata", {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        params: {
            "page": page,
        }
    })
}

export const getDetails = (token: string, id: string) => {
    return axiosConfig.get(`/kata`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        params: {
            'id': id
        }
    })
}

export const createKata = (token: string, creatorId: string, kata: Kata) => {
    return axiosConfig.post(`/kata`, kata, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        // params:{
        //     'id':kata.creator
        // }
    })
}

export const deleteKataByid = (token: string, id: string, creatorId: string) => {
    return axiosConfig.delete(`/kata`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        params: {
            'id': id,
            'creatorId': creatorId
        }
    })
}

export const updateKataById = (token: string, id: string, kata: Kata, creatorId: string) => {
    return axiosConfig.put(`/kata`, kata, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        params: {
            'id': id,
            'creatorId': creatorId
        }
    })
}

export const getMykatasById = (token: string, id: string,) => {
    return axiosConfig.get(`/users/katas`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        params: {
            'id': id,
        }
    })
}

export const sendSolution = (token: string, id: string, solution: string) => {
    return axiosConfig.get(`/users/katas/solution`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        params: {
            'id': id,
            'solution': solution
        }
    })
}

export const updateFiles = (token: string,files: any) => {
    return axiosConfig.post(`/kata/UploadFile`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        params: {
            
        }
    })
}
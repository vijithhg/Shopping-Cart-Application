import axios from 'axios'
import { API_URL } from '../constants/api'

const AUTH_API = `${API_URL}/auth`

export const register = async(name,email,password)=>{
    try{
        const response = await axios.post(`${AUTH_API}/register`,{
            name,email,password
        })
        return response.data
    }catch(error){
        console.log(error)
    }
}

export const login = async(email,password)=>{
    try{
        const response = await axios.post(`${AUTH_API}/login`,{
            email,password
        })
        return response.data
    }catch(error){
        console.log(error)
    }
}
import axios from 'axios'

export const register = async(name,email,password)=>{
    try{
        const response = await axios.post('http://localhost:8000/api/auth/register',{
            name,email,password
        })
        return response.data
    }catch(error){
        console.log(error)
    }
}
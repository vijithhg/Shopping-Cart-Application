import { useEffect, useState } from "react"
import AdminHeader from "../../components/admin/AdminHeader"
import { getAllUsers } from "../../services/users"

const UsersList = ()=>{

    const token = localStorage.getItem('token')
    const [userList,setUserList] = useState([])

    const fetchUsersList = async()=>{
        try{
            const res = await getAllUsers(token)
            setUserList(res)
            
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchUsersList()
    },[])
    return(
        <div className="container">
            <AdminHeader/>
            <h2>UsersList</h2>
            <table className="table table-striped">
               <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date</th>
               </thead>
               <tbody>
               {userList?.map((user)=>{
                const{_id,name,email,role,createdAt} = user
                const formattedDate = new Date(createdAt).toLocaleDateString();
                return(
                    <tr key={_id}>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{role}</td>
                        <td>{formattedDate}</td>
                    </tr>
                )
            })}
               </tbody>
            </table>

           
        </div>
    )
}

export default UsersList
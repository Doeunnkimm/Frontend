
import {useState, useEffect} from 'react'
import UserApi from '../apis/userApi';


const response = UserApi.getUser();
const UserList = () => {
    const userList = response.read();
    console.log(userList)

   
    return (
       <div>
        {userList && userList.map((user)=>(
            <div key={user.id}>
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.phone}</div>
            </div>
        ))}
       </div>
    )
}
export default UserList
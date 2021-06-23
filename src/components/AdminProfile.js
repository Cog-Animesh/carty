import { useEffect, useState } from "react";

function AdminProfile(props){

    let [user,setUser]= useState('');
    useEffect(()=>{
        console.log(props)
        props.setLoginStatus(true);
        let userObj = JSON.parse(localStorage.getItem('user'))
        setUser({...userObj});
        console.log(userObj)
    },[])

    return(
        <div>Welcome {user.username} </div>
    )
}

export default AdminProfile;
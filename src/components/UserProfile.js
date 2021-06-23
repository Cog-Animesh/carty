import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile(props) {
    let [user,setUser]= useState('');
    let paramObj;
    useEffect(()=>{
        console.log(props)
        props.setLoginStatus(true);
        let userObj = JSON.parse(localStorage.getItem('user'))
        setUser({...userObj});
        console.log(userObj)
    },[])

   
    return (
        <div>Welcome {user.username} </div>
    )
}

export default UserProfile;
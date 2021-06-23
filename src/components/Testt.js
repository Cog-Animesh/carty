import axios from "axios";

function Testt() {
    let token = localStorage.getItem('token')
    let apiUrl = "http://localhost:8081";
   const instance =  axios.create({
        baseURL:apiUrl,
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    const makeReq=()=>{
        instance.get("/user/testt")
        .then(res => {
            alert(res.data.message)
        })
    }

    return (
        <div>
            <div>Welcome test</div>
            <button onClick={makeReq}></button>
        </div>

    )
}

export default Testt;
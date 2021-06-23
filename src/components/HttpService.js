const axios  = require('axios')
let token = localStorage.getItem('token')
let apiUrl = "http://localhost:8081";
const instance =  axios.create({
    baseURL:apiUrl,
    headers:{
        Authorization:`Bearer ${token}`
    }
})

 const HttpService = {
    post: function(obj) {
        return instance.post('/user/login', obj)
    }}

    export default HttpService;

    // const post = (obj) => {
    //     return axios.post('/user/login', obj)
    //         .then(function (res) {
    //             if (res.data.status === "success") {
    //                 console.log(res)
    //                 localStorage.setItem('token', res.data.token);
    //                 localStorage.setItem('user', JSON.stringify(res.data.data))
    //                 return res.data;
    //                 // history.push(`/userprofile/${obj.username}`)
    //             }
    //             alert(res.data.message)
    //             console.log(res.data.token)
    //         })
    //         .catch(function (err) {
    //             alert(err)
    //         })
    // }

import axios from "axios";
import { useCookies } from "react-cookie";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import http from "./HttpService";


function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-token'])
    let history = useHistory();
    let { register, handleSubmit, formState: { errors } } = useForm();
    const onFormSubmit = (obj) => {
        console.log(obj)
        loginUser(obj)
    }

    function loginUser(obj) {
        let role = obj.role;
        // console.log(http.post(obj))
        axios.post(`/${role}/login`, obj)
            .then(function (res) {
                if (res.data.status === "success") {
                    console.log(res)
                    localStorage.setItem('role',role);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                    history.push(`/userprofile/productlist`)
                }
                alert(res.data.message)
                console.log(res.data.token)
            })
            .catch(function (err) {
                alert(err)
            })
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card shadow text-center mt-5" style={{ width: "350px"}}>
                <div className="card-body">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="mt-5">
                            <input className="ms-3" value="user" name="role" type="radio" {...register('role')} /><label className="ms-1">User</label>
                            <input className="ms-3" value="admin" name="role" type="radio" {...register('role')} /><label className="ms-1">Admin</label>
                        </div>
                        <div className="mt-4">
                            <input id="uname" placeholder="Username" type="text" className="form-control" {...register('username')} />
                        </div>
                        <div className="mt-4">
                            <input id="pass" placeholder="Password" type="text" className="form-control" {...register('password')} />
                        </div>
                        <div className="mt-5 mb-4">
                            <button type='submit' className='btn btn-primary w-50'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>



    )

}

export default Login;
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function Register() {
    let [file, setFlie] = useState(null);

    let history = useHistory();
    let { register, handleSubmit } = useForm();
    const onFormSubmit = (obj) => {
        let formData = new FormData();
        formData.append('photo', file, file.name)
        formData.append('user', JSON.stringify(obj))
        console.log(obj)
        createUser(formData)
    }

    function createUser(obj) {
        axios.post('/user/create', obj)
            .then(function (res) {
                alert(res.data.message)
                history.push("/login");
            })
            .catch(function (err) {
                alert(err)
            })
    }

    const onFileSelect = (e) => {
        console.log(e.target.files[0])
        setFlie(e.target.files[0])
    }


    return (
        <div className="d-flex justify-content-center">
            <div className="card shadow text-center mt-5" style={{ width: "350px" }}>
                <div className="card-body">
                <h2>Register</h2>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="mt-4">
                            <input id="uname" placeholder="Username" type="text" className="form-control" {...register('username')} />
                        </div>
                        <div className="mt-4">
                            <input id="pass" placeholder="Password" type="text" className="form-control" {...register('password')} />
                        </div>
                        <div className="mt-4">
                            <input id="email" placeholder="Email" type="text" className="form-control" {...register('email')} />
                        </div>
                        <div className="mt-4">
                            <input id="dob" placeholder="Dob" type="date" className="form-control" {...register('dob')} />
                        </div>
                        <div className="mt-4">
                            <input name="photo" type="file" className="form-control" onChange={(e) => onFileSelect(e)} />
                        </div>
                        <div className="mt-5 mb-4">
                            <button type='submit' className='btn btn-primary w-50'>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;
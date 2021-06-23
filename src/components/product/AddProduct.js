import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

function AddProduct(){

    let[file,setFlie]=useState(null);

    let { register, handleSubmit} = useForm();
    const onFormSubmit = (obj) => {
        let formData = new FormData();
        formData.append('photo',file,file.name)
        formData.append('product',JSON.stringify(obj))
        console.log(obj)
        createProduct(formData)
    }

    function createProduct(obj) {
        axios.post('/product/create', obj)
            .then(function (res) {
                alert(res.data.message)
            })
            .catch(function (err) {
                alert(err)
            })
    }

    const onFileSelect=(e)=>{
        console.log(e.target.files[0])
        setFlie(e.target.files[0])
    }

    return(
        <form onSubmit={handleSubmit(onFormSubmit)}>

        <div className="mt-4">
            <input  placeholder="Product Id" type="text" className="form-control w-50" {...register('pid')} />
        </div>
        <div className="mt-4">
            <input  placeholder="name" type="text" className="form-control w-50" {...register('name')} />
        </div>
        <div className="mt-4">
            <input placeholder="Price" type="text" className="form-control w-50" {...register('price')} />
        </div>
        <div className="mt-4">
            <input name="photo" type="file" className="form-control w-50" onChange={(e)=>onFileSelect(e)}/>
        </div>
        <div className="mt-4">
            <button type='submit' className='btn btn-primary'>Add Product</button>
        </div>
    </form>
    )
}

export default AddProduct;
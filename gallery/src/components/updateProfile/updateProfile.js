import React, { useEffect, useState } from 'react'
import "./updateProfile.css"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../actions/User'
import { useNavigate } from 'react-router-dom'
import { setUserStatus } from '../../state'

const UpdateProfile = () => {
    const [base64,setBase64] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user: currentUser } = useSelector(state => state.auth)
    const  status = useSelector(state => state.auth.status)
    const token = useSelector(state => state.auth.token)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            userName: currentUser.userName,
            location: currentUser.location,
            occupation: currentUser.occupation,
            picture: currentUser.picture
        }
    })
    const convertToBase64 = (file) =>{

        return new Promise((resolve,reject) =>{
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () =>{
                resolve(fileReader.result)
            }
            fileReader.onerror = (err) =>{
                reject(err)
            }
        }
        )
    
    }
    const handleFileUpload = async (e) =>{
        e.preventDefault()
        const file = e.target.files[0]
        const base = await convertToBase64(file)
        setBase64(base)
        
    }

   


    const submitForm = (data) => {
        
        data.picture = base64
        console.log(data)
        dispatch(updateUser({id:currentUser._id,data:data,token:token}))
    
    }

    useEffect(()=>{
        if ( status.updateUser ){
            console.log("updateProfile-pending")
        }
        else{
            dispatch(setUserStatus())
            navigate('/home')
            
        }
    },[status.updateUser])

    return (
        <div className='container login-form-wrapper'>
            <div className='login-form-container'>
                <h3>Connect</h3>
                <form className='login-form' onSubmit={handleSubmit(submitForm)}>


                    <div className="form-group">
                        <input type="text" className="form-control" id="fname" placeholder='FirstName' {...register('firstName', { required: true })} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="lname" placeholder='LastName' {...register('lastName', { required: true })} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="uname" placeholder='UserName' {...register('userName', { required: true })} />
                    </div>
                    <div className="input-group mb-3">
                        
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile01"  {...register('picture')} onChange={(e) =>handleFileUpload(e)} />
                            <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                        </div>
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                        </div>
                    </div>



                    <div className="form-group">
                        <input type="text" className="form-control" id="location" placeholder='Location' {...register('location')} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="occupation" placeholder='Work' {...register('occupation')} />
                    </div>
                    <button type='submit'>Submit</button>







                </form>


            </div>
        </div>
    )
}

export default UpdateProfile


import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../actions/Auth'
import { useNavigate } from 'react-router-dom'
const ForgetPassword = () => {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const message = useSelector(state => state.auth.message)
    const submitForm = (data) =>{
        if (data )  {

            dispatch(forgetPassword(data))
           
           
        }
        
       
       
    }
    if (message ==="OTP sent"){
        navigate('/otpConfirm')
    }
    return (
        <div>
            <form  onSubmit={handleSubmit(submitForm)}>
                <div className="form-group">
                    <input type="email" className="form-control" id="email" placeholder='Email ' {...register('email', { required: true })} />
                </div>
               
                <button type="submit" className="btn btn-secondary login-button mt-2">Submit</button>

            </form>
        </div>
    )
}

export default ForgetPassword

import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetPassword } from '../../actions/Auth'
import { useForm } from 'react-hook-form'
const ResetPassword = () => {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const message = useSelector(state => state.auth.message)


    const submitForm = (data) =>{
        if (data )  {
            if (data.password !== data.confirmPassword){
                alert("Mismatch Password")
                return
            }
           dispatch(resetPassword(data))
           if (message === 'password changed'){
                navigate('/')
           }
            }
           
        }
        
  return (
    <div>
      <form  onSubmit={handleSubmit(submitForm)}>
                <div className="form-group">
                    <input type="email" className="form-control" id="email" placeholder='Email ' {...register('email', { required: true })} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="password" placeholder='Password' {...register('password', { required: true })} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="confirmpassword" placeholder='Confirm Password' {...register('confirmPassword', { required: true })} />
                </div>
                <button type="submit" className="btn btn-secondary login-button mt-2">Submit</button>

            </form>
    </div>
  )
}

export default ResetPassword

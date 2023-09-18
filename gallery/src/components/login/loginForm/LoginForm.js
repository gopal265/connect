import React, { useEffect,useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import "./LoginForm.css"

import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword, login, registerUser } from '../../../actions/Auth'

const LoginForm = ({ signUp, setSignUp }) => {
    const { user, success, error } = useSelector(state => state.auth)
    const [displayerror,setDisplayError] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    
    useEffect(() => {
        
        if (success) {
            setSignUp(false)
        }
        if (error){
            setDisplayError(true)
            return
        }
        if (user) {
            navigate("/home")
        }
    })

    const toggleCheckbox = () =>{
        setShowPassword(!showPassword)
    }
    const handleforgotPassword = () =>{
       navigate('/forgetpassword')
    }

    const submitForm = (data) => {

        if (signUp) {
            if (data.password !== data.confirmPassword) {
                alert('Password mismatch')
                return
            }
            data.email = data.email.toLowerCase()
            delete data.confirmPassword
            console.log(data)
            dispatch(registerUser(data))
        }
        else {
            dispatch(login(data))
        }

    }


    return (
        <div className='container login-form-wrapper'>
            <div className={`alert alert-danger error-block full-width  ${displayerror ? "error-active center" : ""}` } role="alert">
                {error} 
                <i class="fa-solid fa-xmark error-hide" onClickCapture={()=> setDisplayError(false)}></i>
            </div>
            <div className='login-form-container'>
                <h3>Connect</h3>
                <form className='login-form' onSubmit={handleSubmit(submitForm)}>
                    {signUp ?
                        (
                            <>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="fname" placeholder='FirstName' {...register('firstName', { required: true })} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="lname" placeholder='LastName' {...register('lastName', { required: true })} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="uname" placeholder='UserName' {...register('userName', { required: true })} />
                                </div>

                            </>
                        )
                        : (
                            <>
                            </>
                        )

                    }
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" placeholder='Email ' {...register('email', { required: true })} />
                    </div>
                    <div className="form-group">
                        <input type={`${showPassword ? "text" : 'password'}`} className="form-control" id="password" placeholder='password' {...register('password', { required: true })} />
                    </div>
                    {
                        signUp ? (
                            <>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="confirm-password" placeholder='Confirm Password' {...register('confirmPassword', { required: true })} />
                                </div>
                            </>
                        )
                            : (
                                <>
                                </>
                            )
                    }
                    {
                        signUp ? (
                            <>
                                <button type="submit" className="btn btn-secondary login-button" >Register</button>
                            </>
                        ) :
                            (
                                <>
                                    <input type='checkbox' checked={showPassword} onChange={toggleCheckbox}/><span className='pl-2 icon-small'>Show Password</span>
                                    <button type="submit" className="btn btn-secondary login-button mt-2">Login</button>
                                </>
                            )

                    }

                </form>
                {
                    signUp ? (
                        <>
                            <p className='no-account'>Already have an account?<span onClick={() => setSignUp(false)}>Sign in</span></p>
                        </>
                    ) :
                        (
                            <>
                                <div className='forget-password'>
                                    <p onClick={handleforgotPassword}>Forget Password?</p>
                                </div>
                                <div className='no-account'>
                                    <p>Don't have an account?<span onClick={() => setSignUp(true)}>Sign up</span></p>
                                </div>
                            </>
                        )
                }

            </div>
        </div>
    )
}

export default LoginForm

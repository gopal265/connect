import React,{useEffect} from 'react'
import { useForm } from "react-hook-form"
import {useNavigate} from "react-router-dom"
import "./LoginForm.css"

import { useDispatch,useSelector } from 'react-redux'
import { login, registerUser } from '../../../actions/Auth'

const LoginForm = ({ signUp, setSignUp }) => {
    const {loading,user,success,error} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const navigate= useNavigate()

    useEffect(()=>{
        if (success){
            setSignUp(false)
        }
        if (user){
            navigate("/home") 
        }
    },[navigate,user,success])

    const submitForm = (data) => {
       
        if (signUp){
            if (data.password !== data.confirmPassword) {
                alert('Password mismatch')
                return
            }
            data.email = data.email.toLowerCase()
            delete data.confirmPassword
            console.log(data)
            dispatch(registerUser(data))
        }
        else{
            dispatch(login(data))
        }
       
    }
    return (
        <div className='container login-form-wrapper'>
            <div className='login-form-container'>
                <h3>Connect</h3>
                <form className='login-form' onSubmit={handleSubmit(submitForm)}>
                    {signUp ?
                        (
                            <>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="fname" placeholder='FirstName' {...register('firstName',{required :true})}  />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="lname" placeholder='LastName' {...register('lastName',{required :true})} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="uname" placeholder='UserName' {...register('userName',{required :true})} />
                                </div>
                                
                            </>
                        )
                        : (
                            <>
                            </>
                        )

                    }
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" placeholder='Email ' {...register('email',{required :true})}  />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" placeholder='password' {...register('password',{required :true})}   />
                    </div>
                    {
                        signUp ? (
                            <>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="confirm-password" placeholder='Confirm Password' {...register('confirmPassword',{required :true})} />
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
                                <button type="submit" className="btn btn-primary login-button" >Register</button>
                            </>
                        ) :
                            (
                                <>
                                    <input type='checkbox' />
                                    <button type="submit" className="btn btn-primary login-button">Login</button>
                                </>
                            )

                    }

                </form>
                {
                    signUp ? (
                        <>
                            <p>Already have an account?<span onClick={() => setSignUp(false)}>Sign in</span></p>
                        </>
                    ) :
                        (
                            <>
                                <div className='forget-password'>
                                    <p>Forget Password?</p>
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

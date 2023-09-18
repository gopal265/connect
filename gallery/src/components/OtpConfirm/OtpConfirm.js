import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { confirmOtp } from '../../actions/Auth'
const OtpConfirm = () => {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const message = useSelector(state => state.auth.message)


    const submitForm = (data) =>{
        if (data)  {

           dispatch(confirmOtp(data))
           
            }
           
        }
        if (message === 'Verified'){
            navigate('/resetPassword')
       }
       
    
    return (
        <div>
            <form  onSubmit={handleSubmit(submitForm)}>
                <div className="form-group">
                    <input type="email" className="form-control" id="email" placeholder='Email ' {...register('email', { required: true })} />
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" id="email" placeholder='Enter OTP ' {...register('otp', { required: true })} />
                </div>
                <button type="submit" className="btn btn-secondary login-button mt-2">Submit</button>

            </form>
        </div>
    )

    }
export default OtpConfirm

import React from 'react'
import Avatar from '../common/avatar/Avatar'
import "./User.css"
import { useDispatch, useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom"
import { getUser } from '../../actions/User'

function User({userName='',picture="",id}) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const navigate = useNavigate()

  const navigateTOProfile = () =>{
  
    dispatch(getUser({id:id,token:token}))
      navigate(`/profile/${id}`)
  
 }
  return (
    <div className='center pt-2 pb-2 pl-5' onClick={navigateTOProfile}>
      <Avatar userName={userName} picture={picture}  />
      <h5 className='ml-2'>{userName}</h5>
    </div>
  )
}

export default User

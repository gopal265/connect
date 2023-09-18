import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../actions/Posts"
import Form from '../../components/Form/Form';
import Posts from '../../components/Posts/Posts';
import Profile from '../../components/profile/Profile';
import Navbar from '../../components/common/Navbar/Navbar';
import FriendList from '../../components/friendList/FriendList';
import { getUserFriends } from '../../actions/User';



const Home = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getUserFriends({ id: user._id, token: token }))

  }, [])
  return (
    <div className='home'>
      <Navbar />

      <div className='container-fluid pl-3 pr-3 '>

        <div className='row'>

          <div className='col-md col-sm'>
            <Profile />
            {window.screen.width < 768 && <FriendList />}
          </div>

          <div className='col-lg-4 col-md-5 col-sm-6'>
            <Form />
            <Posts />
          </div>
          {window.screen.width > 768 &&
            <div className='col-md col-sm home-item'>
              <FriendList />
            </div>


          }

        </div>
      </div>
    </div>
  )
}

export default Home

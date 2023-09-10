import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../actions/Posts"
import Form from '../../components/Form/Form';
import Posts from '../../components/Posts/Posts';
import Profile from '../../components/profile/Profile';
import Navbar from '../../components/common/Navbar/Navbar';
import FriendList from '../../components/friendList/FriendList';



const Home = () => {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  console.log(window.screen.width)
  useEffect(() => {
    dispatch(getPosts())
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
          <div className='col-md col-sm home-item'>
            {  window.screen.width > 768 &&
                <FriendList />
            }
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home

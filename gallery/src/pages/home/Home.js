import React,{useState,useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import {getPosts} from "../../actions/Posts"
import Form from '../../components/Form/Form';
import Posts from '../../components/Posts/Posts';
import Profile from '../../components/profile/Profile';
import Navbar from '../../components/common/Navbar/Navbar';
import FriendList from '../../components/friendList/FriendList';



const Home = () => {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getPosts())
    },[])
  return (
    < >
       <Navbar />
      <div className='container  '>
        <div className='row'>
          <div className='col-4 home-item'>
          <Profile />
          </div>
          <div className='col-4 home-item'>
            <Posts  />
          </div>
          <div className='col-4 home-item'>
            <Form />
            <FriendList />
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Home

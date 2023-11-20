import React from 'react'
import { useSelector } from 'react-redux'
import Leftbar from '../../Component/Leftsidecontainer/Leftbar'
import MainPost from "../../Component/MainPostContainer/MainPost"
import Navbar from '../../Component/Navbar/Navbar'
import Rightbar from '../../Component/RightsideContainer/Rightbar'
import "./home.css"
export default function Home() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user
  console.log(user)
  return (
    <div className='home full-width'>
          <Navbar/>
          <div className="container-fluid px-5">
            <div className='row'>
              <div className='col-lg-3'>
              <Leftbar/>
              </div>
              <div className='col-lg-6'>
              <MainPost/>
              </div>
              <div className='col-lg-3'>
              <Rightbar/>
              </div>
            </div>
          </div>
    </div>
  )
}

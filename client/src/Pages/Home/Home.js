import React from 'react'
import { useSelector } from 'react-redux'
import Leftbar from '../../Component/Leftsidecontainer/Leftbar'
import MainPost from "../../Component/MainPostContainer/MainPost"
import Navbar from '../../Component/Navbar/Navbar'
import Rightbar from '../../Component/RightsideContainer/Rightbar'
import "./home.css"
export default function Home() {
  return (
    <div className='home full-width'>
      <Navbar />
          <div className="container-fluid px-lg-5">
            <div className='row'>
              <div className='col-lg-3 d-none d-lg-block'>
              <Leftbar/>
              </div>
              <div className='col-lg-6 col-12'>
              <MainPost/>
              </div>
              <div className='col-lg-3 d-none d-lg-block'>
              <Rightbar/>
              </div>
            </div>
          </div>
    </div>
  )
}

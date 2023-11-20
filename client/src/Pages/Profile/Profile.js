import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../Component/Navbar/Navbar'
import ProfileLeftbar from '../../Component/ProfileLeftsidecontainer/ProfileLeftbar'
import ProfileMainPost from '../../Component/ProfileMainPostContainer/ProfileMainPost'
import ProfileRightbar from '../../Component/ProfileRightsideContainer/ProfileRightbar'
import "./profile.css"
export default function Profile() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user
  console.log(user)
  return (
    <div className='ProfileContainer'>
      <Navbar />
      <div className='container-fluid px-4'>
        <div className='row'>
            <div className='col-lg-3 col-xl-3 px-0'>
            <ProfileLeftbar />
            </div>
            <div className='col-lg-6 col-xl-6 px-0'>
            <ProfileMainPost />
            </div>
            <div className='col-lg-3 col-xl-3 '>
            <ProfileRightbar />
            </div>
        </div>
      </div>
    </div>
  )
}

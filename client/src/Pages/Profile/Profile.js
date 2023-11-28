import React from 'react'
import ProfileLeftbar from '../../Component/ProfileLeftsidecontainer/ProfileLeftbar'
import ProfileMainPost from '../../Component/ProfileMainPostContainer/ProfileMainPost'
import ProfileRightbar from '../../Component/ProfileRightsideContainer/ProfileRightbar'
import "./profile.css"
import Navbar from '../../Component/Navbar/Navbar'
export default function Profile() {
  return (
    <div className='ProfileContainer'>
      <Navbar />
      <div className='container-fluid px-4'>
        <div className='row'>
            <div className='col-lg-3 col-xl-3 px-0 d-none d-lg-block'>
            <ProfileLeftbar />
            </div>
            <div className='col-lg-6 col-xl-6 px-0 '>
            <ProfileMainPost />
            </div>
            <div className='col-lg-3 col-xl-3  d-none d-lg-block'>
            <ProfileRightbar />
            </div>
        </div>
      </div>
    </div>
  )
}

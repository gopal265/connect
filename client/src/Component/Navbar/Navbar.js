import React from 'react'
import "./navbar.css";
import searchIcon from "../Images/search.png";
import Notifications from "../Images/bell.png";
import Message from "../Images/message.png";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../ReduxContainer/userReducer';
export default function Navbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user
  console.log(user);
  let id = user?.other?._id;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className='navbar-container py-2'>
      <nav class="navbar navbar-expand-md bg-body-white full-width">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Connect</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <div className='center'>
            <div className='searchInputContainer'>
              <img src={`${searchIcon}`} className="searchIcon" alt="" />
              <input type="text" className='search-input' placeholder='search your friends' name="" id="" />
            </div>
            </div>
            

            <div className='IconsContainer'>

              <img src={`${Notifications}`} className="Icons" alt="" />
              <img src={`${Message}`} className="Icons" alt="" />

              <Link to={`/Profile/${id}`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={`${user?.other?.profile}`} className="ProfileImage" alt="" />
                  <p style={{ marginLeft: '5px' }}>{user?.other?.username}</p>
                </div>
              </Link>

              <div className='center px-4 pt-3 full-height' onClick={handleLogout}>
                <p>Logout</p>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </div>
  )
}

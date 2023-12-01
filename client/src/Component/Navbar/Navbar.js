import React, { useLayoutEffect, useState } from 'react'
import "./navbar.css";
import searchIcon from "../Images/search.png";
import Message from "../Images/message.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../ReduxContainer/userReducer';
export default function Navbar() {

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  }

  const handleRightNav = () => {
    setShowNav(!showNav)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='navbar-container py-2'>
      <nav class="navbar  bg-body-white full-width">
        <div class="container-fluid">
          <div className='row'>
            <div className='col-md-4'>
              <a class="navbar-brand" href="#" onClick={() => navigate("/")}>Connect</a>
              <button className="btn btn-secondary d-block d-md-none menu-icon" type="button" onClick={handleRightNav}>
                <i class="fa-solid fa-bars"></i>
              </button>
            </div>

            <div class="d-none d-md-block col-md-8" >
              <div className='d-flex'>


                <div className='center'>
                  {/* <div className='searchInputContainer'>
                    <img src={`${searchIcon}`} className="searchIcon" alt="" />
                    <input type="text" className='search-input' placeholder='search your friends' name="" id="" />
                  </div> */}
                </div>


                <div className='IconsContainer'>
                  {/* <img src={`${Message}`} className="Icons" alt="" /> */}

                  <Link to={`/Profile/${user?._id}`}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {
                        !imageError ?
                          (
                            <img src={`${user?.profile}`} className="profileimage" alt="" onError={handleImageError} />
                          ) :
                          (
                            <div className='imagebackup'>{user.username.substring(0, 1)}</div>
                          )
                      }
                      <p style={{ marginLeft: '5px' }}>{user?.username}</p>
                    </div>
                  </Link>

                  <div className='center px-4  full-height' onClick={handleLogout}>
                    <button className='btn btn-secondary btn-sm'>Logout</button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </nav>
      <div className={`${showNav ? "d-block" : "d-none"} bg-white position-absolute top-0 end-0 right-navbar px-3 py-4 `}>
        <div>
          <div onClick={handleRightNav} >
            <i className="fa-solid fa-xmark float-end" ></i>
          </div>


          <div className='pt-3'>
            <div className='flex ' onClick={() => navigate(`/Profile/${user?._id}`)}>

              {
                !imageError ?
                  (
                    <img src={`${user?.profile}`} className="profileimage" alt="" onError={handleImageError} />
                  ) :
                  (
                    <div className='imagebackup'>{user.username.substring(0, 1)}</div>
                  )
              }
              <p style={{ marginLeft: '5px' }}>{user?.username}</p>
            </div>
            <div className=" nav-options">
              Notifications
            </div>
            <div className=' nav-options' onClick={() => navigate("/explore")}>
              Explore
            </div>
            <div className={`nav-options ${location.pathname.includes("Profile") ? "d-block" : "d-none"} `} onClick={() => navigate(`/profileinfo/${user?._id}`)}>
              Profile Info
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

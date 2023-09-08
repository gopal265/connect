import React,{useState} from 'react'
import "./Navbar.css"
import Avatar from '../avatar/Avatar'
import { useSelector } from 'react-redux'

const Navbar = ({signUp,setSignUp}) => {
  const user = useSelector(state => state.auth.user)

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className='container'>
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          { !user ? 
            (<div className='navbar-signup-btn'>
              {signUp ? (
                <button className='btn btn-primary' onClick={ ()=>setSignUp(!signUp)}>Signin</button>
              ) : (
                <button className='btn btn-primary' onClick={ ()=>setSignUp(!signUp)}>Signup</button>
              ) }
              </div>) :
            
            (
              <>
              <div>
            <input type='text'  placeholder='Search'/>
          </div>
          <ul className="navbar-nav ml-auto feature ">
            
            <li className="nav-item">
              <a className="nav-link" href="#"><i className="fa-solid fa-moon"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><i className="fa-solid fa-bell"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link "><i className="fa-solid fa-question"></i></a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="#"> <Avatar /> </a>
            </li>
          </ul>
          </>
            )
            
            }
          
        </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

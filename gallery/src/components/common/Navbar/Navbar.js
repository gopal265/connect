import React,{useState} from 'react'
import "./Navbar.css"
import Avatar from '../avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { setLogOut } from '../../../state'

const Navbar = ({signUp,setSignUp}) => {
  const user = useSelector(state => state.auth.user)
  const [showOptions,setShowOptions] = useState(false)
  const dispatch = useDispatch()
  const logOut = () =>{
    console.log("logout")
    dispatch(setLogOut())
  }

  return (
    <div className='navbar-container'>
      <nav className="navbar navbar-expand-sm navbar-light ">
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
              <a className="nav-link"  onClick={() =>setShowOptions(!showOptions)}> <Avatar userName={user.userName} picture={user.picture} /> </a>
            </li>
            
          </ul>
          </>
            )
            
            }
          
        </div>
        </div>
      </nav>
      <div className={`options ${showOptions ? "active" : ''}`}>
        <p>Profile</p>
        <p  onClick={logOut}>LogOut</p>
      </div>
    </div>
  )
}

export default Navbar

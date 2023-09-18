import React,{useState,useEffect} from 'react'
import "./Navbar.css"
import logo from "../../../assets/images/logo.png"
import Avatar from '../avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { setLogOut,setSearchUser } from '../../../state'
import { useNavigate } from 'react-router-dom'
import { searchUser } from '../../../actions/User'


const Navbar = ({signUp,setSignUp}) => {
  const user = useSelector(state => state.auth.user)
  const token = useSelector(state => state.auth.token)
  const status = useSelector(state => state.auth.status)
  const [showOptions,setShowOptions] = useState(false)
  const [searchInput,setSearchInput] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOut = () =>{
    console.log("logout")
    dispatch(setLogOut())
  }
  const handleClick = () =>{
    if (searchInput !== ''){
      dispatch(searchUser(searchInput))    
    }
    else{
      console.log('type something')
    }

  } 
  useEffect(()=>{
    if ( status.searchUser ){
        console.log("searchProfile-pending")
    }
    else{
        dispatch(setSearchUser())
        navigate('/searchUser')
        
    }
},[status.searchUser])

  return (
    <div className='navbar-container'>
      <nav className="navbar navbar-expand-sm navbar-light ">
        <div className='container'>
        <a className="navbar-brand" onClick={()=>navigate("/home")}>Connect</a>
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
              <div className='center-v'>
            <input type='text'  placeholder='Search' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}  />
            <p className='pl-3 icon-medium' onClick={handleClick}><i class="fa-solid fa-magnifying-glass"></i></p>
          </div>
          <ul className="navbar-nav ml-auto feature ">
            
            {/* <li className="nav-item">
              <a className="nav-link" href="#"><i className="fa-solid fa-moon"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><i className="fa-solid fa-bell"></i></a>
            </li>
            <li className="nav-item">
              <a className="nav-link "><i className="fa-solid fa-question"></i></a>
            </li> */}
            <li className="nav-item ">
              <a className="nav-link"  > <button className='btn btn-primary btn-small'  onClick={logOut}>LogOut</button> </a>
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

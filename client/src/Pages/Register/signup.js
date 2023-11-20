import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../../Component/ReduxContainer/apiCall';
import app from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default function Signup() {
  const dispatch = useDispatch();
  const {isFetching  , error} = useSelector((state)=>state.user);
  const user = useSelector((state)=>state.user);
  const [email , setEmail] = useState('');
  const [phonenumber , setphonenumber] = useState('');
  const [username , setusername] = useState('');
  const [password , setpassword] = useState('');
  const [file , setfile] = useState(null);
  const userDetails = user.user;
  const navigator = useNavigate();
  const handleClick = (e)=>{
    e.preventDefault();
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage , fileName);
    
    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      signup(dispatch ,{email , password , username , phonenumber , profile:downloadURL});
      })
    });

  }
console.log(userDetails?.Status)
  if(userDetails?.Status==='Pending'){
    navigator("/verify/email");
  }
  return (
    <div className='outer-login-container center'>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-6 center-col'>
          <p className='logo-text'>Soc<span className='logo-part'>ial</span></p>
          <p className='intro-text'>Connect with your <span className='logo-part'>family and friends </span></p>
        </div>
        <div className='col-lg-6 center'>
          <div className='login-form-container'>
          <p className='form-head'>Create New Account</p>
          <input type="file" name="file" id="file" onChange={(e)=>setfile(e.target.files[0])} className='mb-3'/>
          <input type="text" placeholder='Username' onChange={(e)=>setusername(e.target.value)} className='input-text full-width' />
          <input type="text" placeholder='Phonenumber' onChange={(e)=>setphonenumber(e.target.value)} className='input-text full-width' />
          <input type="email" name="" id="" placeholder='email' onChange={(e)=>setEmail(e.target.value)} className='input-text full-width' />
          <input type="password" placeholder='******' name="" onChange={(e)=>setpassword(e.target.value)} id="" className='input-text full-width' />
          <button className='btn btn-info login-button full-width' onClick={handleClick}>Signup</button>
          <Link to={"/"}>
          <p className='pt-3'>Already have a account</p>
          </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

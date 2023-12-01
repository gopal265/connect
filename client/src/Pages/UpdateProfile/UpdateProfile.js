import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { signup, update } from '../../Component/ReduxContainer/userApi';
import app from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./UpdateProfile.css"
export default function UpdateProfile() {
  const dispatch = useDispatch();
  const {user,token,status} = useSelector((state)=>state.user);
  const [email , setEmail] = useState(user.email);
  const [phonenumber , setphonenumber] = useState(user.phonenumber);
  const [username , setusername] = useState(user.username);
  const [file , setfile] = useState(null);
  const [work,setwork] = useState(user.work)
  const [about,setabout] = useState(user.state)
   const navigate = useNavigate();

  const handleClick = (e)=>{
    e.preventDefault();
    if(file !=null){
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
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

      fetch(`http://localhost:5000/api/user/update/${user._id}` , {method:"PUT" , headers:{'Content-Type':"application/Json" , token: token}, body:JSON.stringify({email , username , phonenumber , profile:downloadURL,work:work,about:about})})
      .then(res => navigate("/"))
      .catch(err => alert("update profile failed"))
      })
    });

  }
  else{

    fetch(`http://localhost:5000/api/user/update/${user._id}` , {method:"PUT" , headers:{'Content-Type':"application/Json" , token: token}, body:JSON.stringify({email , username , phonenumber , profile:user.profile,work:work,about:about})})
    .then(res => navigate("/"))
    .catch(err => alert("update profile failed"))
    }
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
          <p className='form-head'>Update Profile</p>
          <div className='center'>
          <img src={user.profile} className='updateImage' />
          </div>
          <div className='center py-3'>
            <label htmlFor='file' className='btn btn-success btn-sm' >Upload Image</label>
          </div>
          <input type="file" name="file" id="file"  onChange={(e)=>setfile(e.target.files[0])} className='mb-3 d-none'/>
          <input type="text" placeholder='Username' value={username} onChange={(e)=>setusername(e.target.value)} className='input-text full-width text-white bg-secondary' readOnly/>
          <input type="text" name="" id="" placeholder='About' value={work} onChange={(e)=>setwork(e.target.value)} className='input-text full-width'/>
          <input type="text" name="" id="" placeholder='Work' value={about} onChange={(e)=>setabout(e.target.value)} className='input-text full-width'  />
          <input type="text" placeholder='Phonenumber' value={phonenumber} onChange={(e)=>setphonenumber(e.target.value)} className='input-text full-width' />
          <input type="email" name="" id="" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='input-text full-width ' readOnly />

          <button className='btn btn-info login-button full-width' onClick={handleClick}>Update</button>
         
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

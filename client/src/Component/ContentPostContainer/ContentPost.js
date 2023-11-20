import React from 'react'
import "./contentpost.css";
import imageIcon from "../Images/gallery.png"
import emojiIcon from "../Images/cat-face.png"
import VideoIcon from "../Images/video.png"
import profileimage from "../Images/Profile.png"
import { useSelector } from 'react-redux';
import { useState } from 'react';
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default function ContentPost() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  console.log(user);
  let id = user?.other?._id;
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [title, setTile] = useState('');
  const [imagePre, setImagePre] = useState(null);
  const [VideoPre, setVideoPre] = useState(null);
  const accessToken = user.accessToken;
  console.log(file?.name)

  const handlePost = (e) => {
    e.preventDefault();
    if (file !== null) {
      const fileName = new Date().getTime() + file?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);

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
            fetch(`http://localhost:5000/api/post/user/post`, { method: "POST", headers: { 'Content-Type': "application/JSON", token: accessToken }, body: JSON.stringify({ title: title, image: downloadURL, video: '' }) }).then((data) => {
              alert("Your Post was upload successfully");
              window.location.reload(true)
            })
          });
        }
      );
    } else if (file2 !== null) {
      const fileName = new Date().getTime() + file2?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, file2);
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
            fetch(`http://localhost:5000/api/post/user/post`, { method: "POST", headers: { 'Content-Type': "application/JSON", token: accessToken }, body: JSON.stringify({ title: title, video: downloadURL, image: '' }) }).then((data) => {
              alert("Your Post was upload successfully");
              window.location.reload(true)
            })
          });
        }
      );
    } else {
      fetch(`http://localhost:5000/api/post/user/post`, { method: "POST", headers: { 'Content-Type': "application/JSON", token: accessToken }, body: JSON.stringify({ title: title, video: '', image: '' }) }).then((data) => {
        alert("Your Post was upload successfully");
        window.location.reload(true)
      })
    }


  }
  return (
    <div>
      <div className='containter-fluid px-2 pe-5 py-2 bg-white posting-outer-container full-width'>

        <div className='py-2 post-head full-width'>
          <img src={`${user?.other?.profile}`} className="profileimage" alt="" />
          <div className='ps-3 full-width'>
            <input type="text" className='input-content' placeholder='Write your real thought.....' onChange={(e) => setTile(e.target.value)} />
          </div>
        </div>

        <div style={{ marginLeft: '10px' }}>
          {imagePre !== null ? <img src={imagePre} style={{ width: "410px", height: '250px', objectFit: "cover", borderRadius: '10px' }} alt="" /> : VideoPre !== null ? <video className="PostImages" width="500" height="500" controls >
            <source src={VideoPre} type="video/mp4" />
          </video> : ''
          }
          
          <div className='upload-container'>
            <div className='center'>
              <label htmlFor='file' className='center'>
                <img src={`${imageIcon}`} className="icons mb-5" alt="" />
                <input type="file" name="file" id="file" style={{ display: "none" }} onChange={(e) => [setFile(e.target.files[0]), setImagePre(URL.createObjectURL(e.target.files[0]))]} />
              </label>
              <img src={`${emojiIcon}`} className="icons  mb-5" alt="" />
              <label htmlFor='file2'>
                <img src={`${VideoIcon}`} className="icons  mb-5" alt="" />
                <input type="file" name="file2" id="file2" style={{ display: "none" }} onChange={(e) => [setFile2(e.target.files[0]), setVideoPre(URL.createObjectURL(e.target.files[0]))]} />
              </label>
            </div>
            <div className='center'>
            <button className='btn btn-primary' onClick={handlePost}>Post</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

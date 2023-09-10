import React, { useState, useEffect } from 'react'
import FileBase from "react-file-base64"
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { createPost } from '../../actions/Posts'
import Avatar from "../common/avatar/Avatar"
import "./Form.css"

const Form = () => {

  const [postData, setPostData] = useState({
    description: "", image: "", tags: ""
  })
  const [displayClear,setDisplayClear] = useState(false)

  const { user: currentUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
   
    dispatch(createPost({ ...postData, userId: currentUser._id }))
    clear()
  }

  const clear = () => {
    setPostData({ description: "", image: "", tags: "" })
    setDisplayClear(false)
  }

  const convertToBase64 = (file) => {

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (err) => {
        reject(err)
      }
    }
    )

  }
  useEffect(()=>{
    if (postData.description !== "" || postData.image !== "" ){
      setDisplayClear(true)
    }
  })
  const handleFileUpload = async (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setPostData({...postData,image : base64})

  }

  return (
    <div className='post-form-wrapper'>

      <div className='center-v post-form-description'>
        <Avatar userName={currentUser.userName} picture={currentUser.picture} />
        <div className='full-width pl-2 center-v'>
          <input type='text' placeholder='Tell your thoughts' value={postData.description} onChange={event => setPostData({ ...postData, description: event.target.value })} />
        </div>
      </div>

      
      <hr />

      <div className="post-form-buttons center-v-sb pl-2">
        
        <div>
        <label htmlFor='image' className='m-0 image-upload icon-small'><i class="fa-solid fa-image "></i> Image</label>
        <input type="file" id='image' accept='image/*'  onChange={(event) => handleFileUpload(event)} />
        </div>
        
        {/* <div className="post-form-description tags ">
        <input type="text" className="form-control" id="tags" value={postData.tags} placeholder='#tags' onChange={(event) => handleFileUpload(event)} />
      </div> */}
        <div>
        <button  className="btn btn-outline-primary btn-sm pl-3 pr-3" onClick={handleSubmit}>Post</button>
        <icon className={`ml-4 mr-1 clear-icon ${displayClear ? "active" : ""}`}   onClick={clear}><i class="fa-solid fa-xmark"></i></icon>
        </div>
        
      </div>

    </div>
  )
}

export default Form;

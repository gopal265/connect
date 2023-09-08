import React, { useState,useEffect } from 'react'
import FileBase from "react-file-base64"
import {useDispatch } from "react-redux"
import {useSelector } from 'react-redux/es/hooks/useSelector'
import { createPost} from '../../actions/Posts'
import "./Form.css"

const Form = () => {

  const [postData, setPostData] = useState({
    description: "", image: ""
  })

  const  { user : currentUser} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleSubmit = (event) =>{
      event.preventDefault();

    
   
        dispatch(createPost({...postData,userId : currentUser._id}))
        clear()
    
      }

  const clear = () =>{
  
      setPostData({ description: "", image: ""})
  }
  return (
    <div className='form-wrapper'>
      <h4> a Memory</h4>
      <form onSubmit={handleSubmit}>
        
       
        <div className="form-group">
          <input type="text" className="form-control" id="description" value={postData.description} placeholder='Description' onChange={(event) => setPostData({ ...postData, description: event.target.value })} />
        </div>
        {/* <div className="form-group">
          <input type="text" className="form-control" id="tags" value={postData.tags} placeholder='tags' onChange={(event) => setPostData({ ...postData, tags: event.target.value })} />
        </div>
    */}
          <div className="form-group">
            
            <FileBase  type="file" multipe={false} onDone = {({base64}) => setPostData({...postData,image:base64})} />
          </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-danger" onClick={clear}>Clear</button>
      </form>
    </div>
  )
}

export default Form;

import React from 'react'
import "./comment.css"
import Avatar from '../common/avatar/Avatar'
const Comment = ({ comment }) => {
    return (
        <div className="comment-block center-v mb-3 mt-2">
            <div className='avatar-block center-v' >
            <Avatar userName={comment.user.userName} picture={comment.user.picture}/>
          
            </div>
          
            <div className='full-width pl-2'>
            <h6 className="mt-0 mb-0" style={{fontSize:10,fontWeight:800}}>{comment.user.userName}</h6>
            <p>{comment.text}</p>    
            </div>
        </div>
    )
}

export default Comment

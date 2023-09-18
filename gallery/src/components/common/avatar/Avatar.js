import React from 'react'
import "./Avatar.css"
const Avatar = ({userName="",picture=""}) => {
  return (
    <div className='avatar'>
      { picture === "" ? (

        <div className="rounded-circle" >{`${userName.substring(0,1)}`}</div>
      )
      :(
        <img src={picture} className="rounded-circle" alt="..."></img>
      )}
      
    </div>
  )
}

export default React.memo(Avatar)

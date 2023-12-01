import React, { useState } from 'react'
import { useLocation ,Link} from 'react-router-dom';

const Following = ({item}) => {

    
  const [imageError, setImageError] = useState(false);
  const location = useLocation();

  const handleImageError = () => {
    setImageError(true);
  }
  return (
    <div className='px-2'>
        <Link to={location.pathname.includes("Profile") ? `/Profile/${item._id}` : `/profileinfo/${item._id}`} >
              <div className='center-col' key={item._id}>
                {
                  !imageError ?
                    (
                      <img src={item?.profile} className="profileimage" alt="" onError={handleImageError} />
                    ) :
                    (
                      <div className='imagebackup'>{item.username.substring(0, 1)}</div>
                    )
                }
                <p className='pt-2'>{item.username}</p>
              </div>
            </Link>
    </div>
  )
}

export default Following

import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Followers = () => {
    let location = useLocation();
    let id = location.pathname.split("/")[2];
    const [Followinguser, setFollowinguser] = useState([]);
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate()

    const handleImageError = () => {
        setImageError(true);
    }
    useEffect(() => {
        const getFollowing = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/post/followers/${id}`);
                setFollowinguser(res.data);
            } catch (error) {
                console.log("Error")
            }
        }
        getFollowing();
    }, [id])
    return (
        <div className='followers-container full-width p-2'>
            <h5>Followers</h5>
            {Followinguser.length == 0 ? (
                <div className='center'>
                    <p>No One Following</p>
                </div>
            ) :

                (<>
                    <div className='pt-3'>
                        {Followinguser.map((item) => (
                            <div>
                                <div className='center-sb' onClick={()=>navigate(`/Profile/${item._id}`)}>
                                    {
                                        !imageError ?
                                            (
                                                <img src={`${item?.profile}`} className="profileimage" alt="" onError={handleImageError} />
                                            ) :
                                            (
                                                <div className='imagebackup'>{item.username.substring(0, 1)}</div>
                                            )
                                    }
                                    <p >{item.username} </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </>
                )
            }




        </div>
    )
}

export default Followers

import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const Followers = () => {
    let location = useLocation();
    let id = location.pathname.split("/")[2];
    const [Followinguser, setFollowinguser] = useState([]);
    useEffect(() => {
        const getFollowing = async () => {
            try {
                const res = await axios.get(`https://connect-01yh.onrender.com/api/post/followers/${id}`);
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
                                <div className='center-sb'>
                                    <img src={`${item.profile}`} className="Friendsimage" alt="" />
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

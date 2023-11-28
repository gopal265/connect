import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
const Explore = () => {
    const { user, token } = useSelector((state) => state.user);
    const [post, setPost] = useState([]);
    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`https://connect-01yh.onrender.com/api/user/flw/${user._id}`, {
                    headers: {
                        token: token
                    }
                })
                setPost(res.data);
            } catch (error) {

            }
        }
        getPost();
    }, [])
    return (
        <div className='width-full explore-container'>
            <div className='center-sb'>
                <p>Explore</p>
                <p className='see-all'>See all</p>
            </div>
            <div className='pt-3  images-container'>
                {post.map((item) => (
                    [item.image === '' ? '' :
                        <div className='pe-2'>
                            <img src={`${item.image}`} className="explore-image" alt="" />

                        </div>
                    ]

                ))}


            </div>

        </div>
    )
}

export default Explore

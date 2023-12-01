import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Explore = () => {
    const { user, token } = useSelector((state) => state.user);
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/user/flw/${user._id}`, {
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
            </div>
            <div className='pt-3  images-container container-fluid'>
                <div className='row'>
                    {post.map((item) => (
                        [item.image === '' ? '' :
                            <div className='px-2 col-6 ' onClick={() => navigate("/post",{state:item})}>
                                <img src={`${item.image}`} className="explore-image" alt="" />

                            </div>
                        ]

                    ))}

                </div>
            </div>

        </div>
    )
}

export default Explore

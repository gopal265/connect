import React, { useEffect, useState } from 'react'
import "./leftbar.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
export default function Leftbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user
  console.log(user);
  let id = user?.other?._id;
  const accesstoken = user.accessToken;
  console.log(accesstoken)
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/flw/${id}`, {
          headers: {
            token: accesstoken
          }
        })
        setPost(res.data);
      } catch (error) {

      }
    }
    getPost();
  }, [])

  console.log(post);
  return (
    <div className='full-width'>
      <div className=''>
        <div >
          <p >Notifications</p>
          <p className='see-all'>See all</p>
        </div>

      </div>

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

    </div>
  )
}

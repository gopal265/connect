import React from 'react'
import { addRemoveFriend } from '../../actions/User'
import { useDispatch,useSelector } from 'react-redux'
const AddRemoveFriend = ({postUserId}) => {

   
    const token = useSelector(state=>state.auth.token)
    const {friendsIds} = useSelector(state=> state.friends)
    
    const userId = useSelector(state => state.auth.user._id)
   
   
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(addRemoveFriend({ id: userId, friendId: postUserId, token: token }))
      }
  
  return (
    <div onClick={handleClick} className='icon'>
                {
                  ( friendsIds.includes(postUserId)) ? (
                    <div>
                      <span ><i class="fa-solid fa-user-minus"></i></span>
                    </div>
                  ) : (
                    <div>
                      <span ><i class="fa-solid fa-user-plus"></i></span>
                    </div>
                  )
                }
              </div>
  )
}

export default React.memo(AddRemoveFriend)

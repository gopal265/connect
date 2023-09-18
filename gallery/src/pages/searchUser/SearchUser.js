import { useSelector } from "react-redux"
import User from "../../components/searchUser/User"
import "./SearchUser.css"

const SearchUser = () => {
    const searchUser = useSelector(state => state.auth.searchUser)
   
    
  return (
    <div className="home ">
      { searchUser.length !==0 ? (
        <div className="pt-5">
          <div className="text-align">Users List</div>
        {searchUser.map(user =>(
            <User userName ={user.userName} picture={user.picture} id={user._id}/>
        ))}
        </div>
      ):(
        <>
        <div>No User Found</div>
        </>
      )
      }
    </div>
  )
}

export default SearchUser

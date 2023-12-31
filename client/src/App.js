
import './App.css';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/login';
import Signup from './Pages/Register/signup';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Resetpassword from './Pages/Resetpassword/Resetpassword';
import Verifyemail from './Pages/VerifyEmail/Verifyemail';
import Forgotpassword from './Pages/Forgotpassword/Forgotpassword';
import Notification from './Component/Notification/Notification';
import Explore from './Component/Explore/Explore';
import ProfileLeftbar from './Component/ProfileLeftsidecontainer/ProfileLeftbar';
import Navbar from './Component/Navbar/Navbar';
import PostPage from './Pages/Post/PostPage';
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile';

function App() {
  const {user,status,token}= useSelector((state)=>state.user);
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
        <Route path="/" element={ user?.verifed === true ? <Home/> : <Navigate to={"/login"} replace={true}/>}></Route>
        <Route path="/Profile/:id" element={<Profile />}></Route>
        <Route path="/login" element={ user?.verifed === true ? <Navigate to={"/"} replace={true}/> : <Login />}></Route>
        <Route path="/signup" element={   <Signup />}></Route>
        <Route path="/verify/email" element={status  === 'Pending'  ? <Verifyemail/> : user?.verifed === true ? <Navigate to={"/"} replace={true}/> : <Login/>}></Route>
        <Route path="/forgot/password" element={<Forgotpassword/>}></Route>
        <Route path="/reset/password" element={<Resetpassword/>}></Route>
        <Route path='/notification' element={<><Navbar /><Notification /></>} />
        <Route path='/explore' element={<><Navbar /><Explore/></>} />
        <Route path='/profileinfo/:id' element={user?.verifed ? <><Navbar /><ProfileLeftbar /></> : <Login />} />
        <Route path='/post' element = {user?.verifed ? <PostPage /> : <Login />} />
        <Route path='/updateprofile' element={token ? <UpdateProfile /> : <Login />} />
         
    </Routes>
  </BrowserRouter>
      
    </div>
  );
}

export default App;

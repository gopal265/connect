
import './App.css';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/login';
import Signup from './Pages/Register/signup';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Resetpassword from './Pages/Resetpassword/Resetpassword';
import Verifyemail from './Pages/VerifyEmail/Verifyemail';
import Forgotpassword from './Pages/Forgotpassword/Forgotpassword';
import Notification from './Component/Notification/Notification';
import Explore from './Component/Explore/Explore';
import ProfileLeftbar from './Component/ProfileLeftsidecontainer/ProfileLeftbar';
import Navbar from './Component/Navbar/Navbar';

function App() {
  const {user}= useSelector((state)=>state.user);
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={ user?.verifed === true ? <Home/> : <Navigate to={"/login"} replace={true}/>}></Route>
        <Route path="/Profile/:id" element={<Profile />}></Route>
        <Route path="/login" element={ user?.verifed === true ? <Navigate to={"/"} replace={true}/> : <Login />}></Route>
        <Route path="/signup" element={   <Signup />}></Route>
        <Route path="/verify/email" element={user?.Status === 'Pending' ? <Verifyemail/> : user?.verifed === true ? <Navigate to={"/"} replace={true}/> : <Login/>}></Route>
        <Route path="/forgot/password" element={<Forgotpassword/>}></Route>
        <Route path="/reset/password" element={<Resetpassword/>}></Route>
        <Route path='/notification' element={<Notification />} />
        <Route path='/explore' element={<Explore/>} />
        <Route path='/profileinfo/:id' element={<ProfileLeftbar />} />
         
    </Routes>
  </BrowserRouter>
      
    </div>
  );
}

export default App;

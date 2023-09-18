import './App.css';
import Home from './pages/home/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./pages/login/Login"
import { useSelector } from 'react-redux';
import ProfilePage from './pages/profile/Profile';
import UpdateProfile from './components/updateProfile/updateProfile';
import SearchUser from './pages/searchUser/SearchUser';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import OtpConfirm from './components/OtpConfirm/OtpConfirm';
import ResetPassword from './components/ResetPassword/ResetPassword';



function App() {
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  return (
   
    <BrowserRouter>
    <div className="App home">
      <Routes>
        <Route path='/'  Component={Login} />
        <Route path='/home' Component={isAuth ? Home  : Login} />
        <Route path="/profile/:userId" Component={isAuth ? ProfilePage : Login} />
        <Route path="/updateProfile" Component={ isAuth ? UpdateProfile : Login} />
        <Route path ="/searchUser" Component={isAuth ? SearchUser : Login} />
        <Route path='/forgetpassword' Component={ForgetPassword} />
        <Route path='/otpConfirm' Component={OtpConfirm} />
        <Route path='/resetPassword' Component={ResetPassword} />
        
      </Routes>
   
    </div>
    </BrowserRouter>
    
  );
}

export default App;

import './App.css';
import Home from './pages/home/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./pages/login/Login"
import { useSelector } from 'react-redux';
import ProfilePage from './pages/profile/Profile';
import UpdateProfile from './components/updateProfile/updateProfile';




function App() {
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  return (
   
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/'  Component={Login} />
        <Route path='/home' Component={isAuth ? Home  : Login} />
        <Route path="/profile/:userId" Component={isAuth ? ProfilePage : Login} />
        <Route path="/updateProfile" Component={ isAuth ? UpdateProfile : Login} />
        
      </Routes>
   
    </div>
    </BrowserRouter>
    
  );
}

export default App;

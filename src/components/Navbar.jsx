import React , { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';

const Navbar= ()=>{
  const {currentUser}=useContext(AuthContext);
    return(
        <div className='navbar'>
        <span className="logo"><ForumRoundedIcon fontSize="large" /></span>
        <div className="user">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
          <button onClick={()=>{signOut(auth)}} ><LogoutIcon /></button>
        </div>
      </div>
    )
}

export default Navbar;
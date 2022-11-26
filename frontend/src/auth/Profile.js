
import {useState} from 'react';




export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
    {/* {user?<div>
    
            
          
      <p>Welcome {user.fname} {user.lname}</p>

      <img src={user.avatar} alt="avatar"></img>
      
</div>:''} */}
{/* {user} */}
</>
  );
}
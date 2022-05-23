import { FaSignInAlt, FaSignOutAlt, FaUser, FaRegLightbulb } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <FaRegLightbulb size="15px" /> System PRI 
        </Link> 
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <button className="btn-header" onClick={() => navigate("/profile")}>
                Mój profil
              </button>
            </li>
            <li>
              <button className="btn-header" onClick={() => navigate("/tools")}>
                Narzędzia
              </button>
            </li>
            <li>
              <button className="btn-header" onClick={() => navigate("/opiekunowie")}>
                Opiekunowie
              </button>
            </li>
            <li>
              <button className="btn-header" onClick={() => navigate("/teams")}>
                Zespoły
              </button>
            </li>
            <li>
              <button className="btn-header" onClick={onLogout}>
                <FaSignOutAlt /> Wyloguj
              </button>
            </li>
          </>
        ) : (
          <>
            <li style={{marginRight: "20px"}}>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;

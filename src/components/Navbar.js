import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="logo">Link&Loop</span>
      </div>

      <div className="navbar-center">
        <Link to="/profile">Profile</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/search">Search</Link>
      </div>

      <div className="navbar-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;

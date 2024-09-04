import { Link } from "react-router-dom";
import "./Navbar.css"
const Navbar = () => {
  return (
    <nav className="navContainer">
      <Link to="/">Home</Link>
      <Link to="/publications">Publications</Link>
      <Link to="/admin">Dashboard</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-icon">🌱</div>

          <span>
            Crop<span>Yield</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/predict">Predict</Link>

          <Link to="/dashboard">Dashboard</Link>

          <Link to="/history">History</Link>

          <Link to="/insights">Insights</Link>
        </div>

        {/* CTA */}
        <div className="nav-actions">
          <Link to="/register" className="nav-register">
            Register
          </Link>

          <Link to="/login" className="nav-button">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

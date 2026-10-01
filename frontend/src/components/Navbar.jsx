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
        <Link to="/predict" className="nav-button">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

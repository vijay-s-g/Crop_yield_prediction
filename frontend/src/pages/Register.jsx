import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setMessage(data.message);
        return;
      }

      setMessage("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch {
      setMessage("Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "15px",
          background: "white",
        }}
      >
        <h1>Create Account</h1>

        <form onSubmit={handleRegister}>
          {/* Username */}
          <div style={{ marginBottom: "20px" }}>
            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "20px" }}>
            <label>Gmail / Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "20px" }}>
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              required
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {message && <p style={{ marginTop: "15px" }}>{message}</p>}

        <p style={{ marginTop: "20px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

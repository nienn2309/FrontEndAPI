import React, { useState } from "react";
import LSstyle from "./Login.module.css";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../Service/api";
import GoogleLogin from "@react-oauth/google";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await loginUser(username);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={LSstyle.loginpage}>
      <div className={LSstyle.wrapper}>
        <div className={LSstyle.loginbox}>
          <div className={LSstyle.loginheader}>
            <span>Login</span>
          </div>
          <div className={LSstyle.inputbox}>
            <input
              type="text"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="bx bx-user icon"></i>
          </div>
          {error && <div className={LSstyle.error}>{error}</div>}
          <button
            className={LSstyle.loginbtn}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

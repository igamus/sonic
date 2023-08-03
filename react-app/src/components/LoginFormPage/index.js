import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import Barcode from './Barcode.png'
import Back from './AT_BG5.jpg'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginForm.css";
function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/me" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (

    <div className="main-wrap">
      <div className="login-box">
        <div className="login-io-box">

          <div className="sol-box">
          <h2>Welcome Back!</h2>
          <span>We're so excited to see you again!</span>
            <form className="form-box" onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <label>
                <h5>Email</h5>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label>
              <h5>Password</h5>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <a href="" >
                <div className="forgotten">Forgot your password?</div>
              </a>
              <br></br>

              <button className="login-bttn" type="submit">
                Log In
              </button>
              <span className="account">
                Need an account? <Link to="/signup" className="sing">Register</Link>
              </span>
            </form>
          </div>
          <div className="sag-box">
            <img src={Barcode} alt="test"/>
            <h2>Log in with QR Code</h2>
            <div>Scan this with the <strong>Discord mobile app</strong> to login in instantly</div>
          </div>
        </div>
      </div>






    </div>
  );
}

export default LoginFormPage;

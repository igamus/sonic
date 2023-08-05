import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

import classes from "./SignupForm.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/me" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const form = new FormData();
      form.append("email", email);
      form.append("username", username);
      form.append("password", password);
      form.append("profile_picture", profileImage);

      console.log(form);
      const data = await dispatch(signUp(form));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className={classes.signback}>
      <div className={classes.signupbox}>
        <div className={classes.signiobox}>
          <div className={classes.siobox}>
            <h2>Create an account</h2>
            <form className={classes.formzbox} onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <label>
                <h5>
                  Email <i style={{ color: 'red' }}>*</i>

                </h5>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                <h5>Username  <i style={{ color: 'red' }}>*</i></h5>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              <label>
                <h5>ProfilePicture  <i style={{ color: 'red' }}>*</i></h5>
                <input
                  type="file"
                  required
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  accept="image/*"
                />
              </label>
              <label>
                <h5>Password  <i style={{ color: 'red' }}>*</i></h5>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                <h5>Confirm Password  <i style={{ color: 'red' }}>*</i></h5>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className={classes.signupbbtn}>
                Sign Up
              </button>
              <Link to="/login" className="sing">
                Already have an account
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

import classes from "./SignupForm.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function isValidImage(fileName) {
  const validEndings = ['.jpg', '.jpeg', '.png'];
  for (const ending of validEndings) if (fileName.endsWith(ending)) return true;

  return false;
};

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/me" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];
    console.log({
      "username": username,
      "password": password,
      "email": email,
      "profileImage": profileImage,
      "confirmPassword": confirmPassword,
      "errors": errors
    })

    if (!username.length) newErrors.push("Must include username");
    if (!password.length) newErrors.push("Password: Must include password");
    if (!email.length || !email.includes("@")) newErrors.push("Email: Must include a valid email");
    if (!profileImage.length || !isValidImage(profileImage)) newErrors.push("Profile Picture: Image URL must end in .png, .jpg, or .jpeg");
    if (username.length < 1 || 40 < username.length) newErrors.push("Username: Username must be between 1 and 40 characters.");
    if (password !== confirmPassword) newErrors.push("Password: Passwords must match");
    if (password.length < 1 || 255 < password.length) newErrors.push("Password: Password must be between 1 and 255 characters");
    if (profileImage.length > 255) newErrors.push("Profile Picture: Max URL length exceeded (must be less than 255 characters)");

    if (newErrors.length) {
      return setErrors(newErrors);
    }

    // validated on front-end, so send to the back
    const form = new FormData();
    form.append("email", email);
    form.append("username", username);
    form.append("password", password);
    form.append("profile_picture", profileImage);

    try {
      const data = await dispatch(signUp(form));
      if (data) {
        setErrors(data)
      }
      console.log('data in try:', data)
    } catch (e) {
      console.log('e in catch:', e);
      setErrors(e);
    }
  };

  return (
    <div className={classes.signback}>
      <div className={classes.signupbox}>
        <div className={classes.signiobox}>
          <div className={classes.siobox}>
            <h2 className="createacc">Create an account</h2>
            <ul className="signuperrorc">
              {errors.map((error, idx) => (
                <li className="signuperror" key={idx}>{error}</li>
              ))}
            </ul>
            <form className={classes.formzbox} encType='multipart/form-data' onSubmit={handleSubmit}>
              <label>
                <h5>
                  Email <i style={{ color: 'red' }}>*</i>

                </h5>
                <input
                  type="email"
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
                  type="text"
                  required
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
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

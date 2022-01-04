import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import "./login.css";
import logo from "../../image/Logo3.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../userSlice";
import { flagStatus } from "../../profileSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const flag = useSelector((state) => state.profile.flag);
  const initialState = {
    username: "",
    userPassword: "",
  };

  const [user, setUser] = useState(initialState);

  const displayMessage = () => {
    if (errorMsg !== "") {
      return (
        <Alert
          variant="danger"
          style={{
            display: errorMsg ? "" : "none",
          }}
        >
          {errorMsg}
        </Alert>
      );
    }
  };

  function onChangeHandler(e) {
    setErrorMsg("");
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
    axios
      .post("http://localhost:10001/user/login", user)
      .then((response) => {
        console.log(response.data);
        dispatch(loginUser(response.data));
        dispatch(flagStatus(""));
        navigate('/ProfilePage');
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response);
        //does not alert user
        setErrorMsg("Username or Password is Incorrect");
        setUser(initialState);
      });
  }

  function onClickHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = "/Register";
  }

  return (
    <div>
      <section>
        <div className="container">
          <div className='row'>
            <div className="login-info col-6">
              <div>
                <img src={process.env.PUBLIC_URL + '/img/MiniMintLogo2.png'} alt="MiniMint Logo"></img>
                <h1 className="brand-name">
                  MiniMint
                </h1>
                <br />
                <div className="brand-motto">
                  <h2>
                    A few mints a day<br></br>
                    keeps the boredem away.
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-6">
              <br></br>
              <form className="login-form" onSubmit={onSubmitHandler}>

                <div className="mb-3">
                  <p className="form-label1">Login</p>
                </div>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control" name="username" placeholder="Enter Your Username" value={user.username} onChange={onChangeHandler} required />
                  {" "}
                  {/* <br></br> */}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name="userPassword" placeholder="Password" value={user.userPassword} onChange={onChangeHandler} required />
                  <br></br>
                  <div className="messages">{displayMessage()}</div>
                </div>

                <button className="btn col-12" type="submit">Log In</button>
                <h1>{flag}</h1>
                <hr />
                <p>Don't have an account?</p>

                <button type="submit" className="btn btn-regis" onClick={onClickHandler}>Create an Account</button>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default LoginForm;

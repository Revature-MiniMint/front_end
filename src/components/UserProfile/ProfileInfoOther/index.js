import React, { useEffect, useState } from "react";
import { faBirthdayCake, faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import "../style.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../../../profileSlice";
import "./../ProfileInfo/style.css";

const ProfileInfoOther = (props) => {

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  }

  const [userInfo, setUserInfo] = useState({
    name: "",
    dob: "",
    gender: "",
    bio: "",
    email: ""
  })

  useEffect(() => {
    console.log(props)
    axios.post("http://localhost:20030/profiles/hidden/" + props.data.userId, viewerProfile.userId, { headers: headers })
      .then((response) => {
        setUserInfo(response.data);
      });
  }, []);

  const info = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const viewerProfile = {
    ...info, ...user
  }

  if (!userInfo) return null;

  function checking(x) {
    if (x == "") {
      return (
        <p>Private</p>
      )
    } else {
      return (x)
    }
  }


  return (
    <div className="container" style={{ textAlign: "left" }}>
      <div className="col container profile-info">
        <div className="row">
          <div className="col profile-info-name">
            <p>{checking(userInfo.name)}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <p>{checking(userInfo.name)}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p><FontAwesomeIcon icon={faBirthdayCake}/> {checking(userInfo.dob.substr(0, 10))}</p>
              </div>
              <div className="col">
                <p><FontAwesomeIcon icon={faMars}/> {checking(userInfo.gender)}</p>
              </div>
            </div>
            <br />
            <div className="row">
              <div>
                <p
                  style={{
                    height: "200px",
                    width: "100%",
                    marginBottom: "10px",
                    boxSizing: "border-box",
                    border: "0px",
                    fontWeight: "normal",
                    fontSize: "18px",
                  }}
                >
                  {checking(userInfo.bio)}
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn contact-btn"
            style={{ marginBottom: "100px" }}
          >
            <a href={"mailto:" + checking(userInfo.userEmail)} target="_blank">Contact</a>
          </button>
        </div>
      </div>
    </div>
  );
}
  export default ProfileInfoOther;
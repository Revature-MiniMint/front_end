import React, { useEffect } from "react";
import {
  faBirthdayCake,
  faVenus,
  faMars,
} from "@fortawesome/free-solid-svg-icons";
import "../style.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../../../profileSlice";
import { flagStatus } from "../../../profileSlice";
import { useNavigate } from "react-router";
import "./style.css";

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const info = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const profile = {
    ...info,
    ...user,
  };

  var dob = profile.dob
  if(dob) {
    dob = dob.substr(0,10)
  } else {
    dob = "2000-01-01"
  }

  useEffect(() => {
    axios
      .get("http://localhost:20030/profiles/" + profile.userId)
      .then((response) => {
        dispatch(userInfo(response.data));
        if (profile.userId !== 0) {
          console.log(profile);
          if (response.data.name == "") {
            navigate("/UpdatePage");
          }
        } else {
          navigate("/");
          dispatch(flagStatus("Please login before proceeding to profile"));
        }
      });
    console.log(profile.userId);
  }, []);

  if (!profile) return null;

  // console.log(profile);
  // console.log(state);

  function checking(x) {
    if (x == "") {
      return (
        <p>Private</p>
      );
    } else {
      return x;
    }
  }

  return (
    <div className="container" style={{ textAlign: "left" }}>
      <div className="col container profile-info">
        <div className="row">
          <div className="col profile-info-name">
            <p>{checking(profile.name)}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p><FontAwesomeIcon icon={faBirthdayCake}/> {checking(dob)}</p>
          </div>
          <div className="col">
            <p><FontAwesomeIcon icon={faMars}/> {checking(profile.gender)}</p>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="profile-info-gen">
            <p
              style={{
                height: "100px",
                width: "100%",
                marginBottom: "10px",
                boxSizing: "border-box",
                border: "0px",
                fontWeight: "normal",
                fontSize: "18px",
              }}
            >
              {checking(profile.bio)}
            </p>
          </div>
          <button
            type="button"
            className="btn contact-btn"
            style={{ marginBottom: "100px" }}
          >
            <a href={"mailto:" + checking(profile.userEmail)} target="_blank">Contact</a> 
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileInfo;

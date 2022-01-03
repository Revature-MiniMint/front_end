import React, { useEffect } from "react";
import { faBirthdayCake, faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import "../style.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../../../profileSlice";

const ProfileInfo = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:10011/profiles/" + profile.userId).then((response) => {

      dispatch(userInfo(response.data));
    });
  }, []);

  const state = useSelector((state) => state);
  const info = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const profile = {
    ...info, ...user
  }

  if (!profile) return null;

  console.log(profile)
  console.log(state)

  function checking(x) {
    if (
      x == null
    ) { 
      return (
        <img width="50px" src="https://cdn.pixabay.com/photo/2021/01/11/21/22/candy-5909726_1280.png" />
      )
    } else {
      return(x)
    }
  }

  return (
    <div className="container" style={{ textAlign: "left" }}>
      <div className="col profile-info">
        <div className="row">
          <div className="col profile-info-name">
            <p>
              {/* {checking(profile.name)}
              {checking(profile.userId)} */}
              Mark Watson
            </p>
          </div>
        </div>
        <div className="row profile-info-gen">
          <div className="col">
            <p>
              {/* {checking(profile.dob)} */}
              <FontAwesomeIcon icon={faBirthdayCake} size="lg" />
              &nbsp; 12/12/1999
            </p>
          </div>
          <div className="col">
            <p>
              <FontAwesomeIcon icon={faMars} size="lg" />
              <FontAwesomeIcon icon={faVenus} size="lg" />
              {/* {checking(profile.gender)} */}
              &nbsp;
              Male
              </p>
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
              {/* {checking(profile.bio)} */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

            </p>
          </div>
          <button
            type="button"
            className="btn contact-btn"
            style={{ marginBottom: "100px" }}
            mailto={checking(profile.userEmail)}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileInfo;

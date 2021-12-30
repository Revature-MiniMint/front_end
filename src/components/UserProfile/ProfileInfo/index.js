import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import "../style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../../../profileSlice";

const ProfileInfo = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:9007/profiles/4").then((response) => {
      dispatch(userInfo(response.data));
    });
  }, []);

  const info = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const profile = {
    ...info, ...user
  }

  if (!profile) return null;

  function checking(x) {
    if (
      x == null
    ) { 
      return (
        <img width="50px" src="https://spng.pngfind.com/pngs/s/80-803349_png-file-svg-mint-candy-clipart-black-and.png" />
      )
    } else {
      return(x)
    }
  }


  return (
    <div className="container" style={{ textAlign: "left" }}>
      <div className="col">
        <div className="row">
          <div className="col">
            <p>
              {checking(profile.name)}
              {checking(profile.userId)}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>{checking(profile.dob)}</p>
          </div>
          <div className="col">
            <p>{checking(profile.gender)}</p>
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
              {checking(profile.bio)}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-danger"
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

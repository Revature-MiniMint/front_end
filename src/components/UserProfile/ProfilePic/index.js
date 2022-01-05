import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PROFILE_PIC_URL_PREFIX } from "../../../url_constants";
import { imgErrorHandler } from "../../../imgErrorHandler";
import axios from "axios";
import "./style.css";

const ProfilePic = () => {
  const info = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const profile = {
    ...info,
    ...user,
  };

  if (!profile) return null;

  return (
    <div className="container">
      <div className="profile-pic">
        <div className="row justify-content-center">
          <div
            style={{
              border: "1px solid #C4C4C4",
              borderRadius: "50%",
              width: "250px",
              height: "250px",
              overflow: "hidden",
              verticalAlign: "middle",
              marginBottom: "20px",
            }}
            className="center"
          >
            <img
              //change to reference userId
              src={PROFILE_PIC_URL_PREFIX + profile.userId}
              alt=""
              className="avatar"
              onError={imgErrorHandler}
              style= {{
                objectFit: "cover",
                width: "100%",
                height: "100%"
              }}
            />
          </div>
        </div>
        <div className="row">
          <p className="profile-alias">
            {profile.alias}
            </p>
          <p className="profile-username">
            <span>@</span>
            {profile.username} {/*This doesn't work*/}
            
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProfilePic;

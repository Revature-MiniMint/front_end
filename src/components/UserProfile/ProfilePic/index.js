import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfilePic = () => {
  const info = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const profile = {
    ...info,
    ...user,
  };

  if (!profile) return null;

  return (
    <div className="container" style={{ fontWeight: "bold" }}>
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
              marginBottom: "20px"
            }}
            className="center"
          >
            <img
              src="https://minimint.s3.us-east-1.amazonaws.com/3"
              alt=""
              className="avatar"
            />
          </div>
        </div>
        <div className="row">
          <p className="profile-alias">
            {/* {profile.alias} */}
            Mark
            </p>
          <p className="profile-username">
            <span>@</span>
            {/* {profile.username} */}
            Mark 123
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProfilePic;

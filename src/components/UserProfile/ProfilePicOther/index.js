import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PROFILE_PIC_URL_PREFIX } from "../../../url_constants";
import { imgErrorHandler } from "../../../imgErrorHandler";
import axios from "axios";

const ProfilePicOther = (props) => {
  const info = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const viewerProfile = {
    ...info,
    ...user,
  };

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
        console.log(response)
      });
  }, []);

  if (!viewerProfile) return null;

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
              //change to reference userId
              src={PROFILE_PIC_URL_PREFIX + props.data.userId}
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
            {userInfo.alias}
          </p>
          <p className="profile-username">
            <span></span>
            {userInfo.userName} {/*This doesn't work*/}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProfilePicOther;

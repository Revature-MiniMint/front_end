import React from "react";
import ProfilePicOther from "../../components/UserProfile/ProfilePicOther";
import ProfileInfoOther from "../../components/UserProfile/ProfileInfoOther";
import ProfilePosts from "../../components/UserProfile/ProfilePosts";
import { useLocation } from "react-router";

const ProfileOtherPage = () => {

  const location = useLocation()
  const props = location.state
  console.log(props)

  return (
    <div className="container">
      <br />
      <div className="profile">
        <div className="row">
          <div className="col" align="center">
            <ProfilePicOther data={props.data}/>
          </div>
          <div className="col">
            <ProfileInfoOther data={props.data}/>
          </div>
        </div>
      </div>
      <div className="row">
        <ProfilePosts />
      </div>
    </div>
  );
};
export default ProfileOtherPage;

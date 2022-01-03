import React from "react";
import ProfilePic from "../../components/UserProfile/ProfilePic";
import ProfileInfo from "../../components/UserProfile/ProfileInfo";
import ProfilePosts from "../../components/UserProfile/ProfilePosts";

const ProfilePage = () => {

  return (
    <div className="container">
      <br />
      <div className="profile">
        <div className="row">
          <div className="col" align="center">
            <ProfilePic />
          </div>
          <div className="col">
            <ProfileInfo />
          </div>
        </div>
      </div>
      <div className="row">
        <ProfilePosts />
      </div>
    </div>
  );
};
export default ProfilePage;

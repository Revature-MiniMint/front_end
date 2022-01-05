import React from "react";
import ProfilePicOther from "../../components/UserProfile/ProfilePicOther";
import ProfileInfoOther from "../../components/UserProfile/ProfileInfoOther";
import ProfilePostsOther from "../../components/UserProfile/ProfilePosts";
import { useLocation } from "react-router";
import NavbarProfile from "../../components/Navbar";

const ProfileOtherPage = () => {

  const location = useLocation()
  const props = location.state
  console.log(props)

  return (
    <>
    <NavbarProfile />
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
        <ProfilePostsOther data={props.data} />
      </div>
    </div>
    </>
  );
};
export default ProfileOtherPage;

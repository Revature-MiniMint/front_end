import React, {useEffect} from "react";
import axios from "axios";
import Profile from "../../../pages/profile";

const ProfilePic = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  
    useEffect(() => {
      axios.get("http://localhost:9007/profiles/1").then((response) => {
        setUserInfo(response.data);
      });
    }, []);
  
    if (!userInfo) return null;

  return (
    <div className="container" style={{ fontWeight: "bold" }}>
      <div className="col">
        <div clasName="row">
          <div style={{
              border: "1px solid #C4C4C4",
              borderRadius: "50%",
              width: "250px",
              height: "250px",
              overflow: "hidden",
              verticalAlign: "middle",
              marginBottom: "20px"
          }}>
            <img src={process.env.PUBLIC_URL + '/img/profile.jpg'} alt="" class="avatar" width="250" height="250" />
          </div>
        </div>
        <div className="row">
          <p>Alias</p>
          <p style={{fontWeight: "normal", color:"gray"}}>
            <span>@</span>
            {userInfo.username}
            </p>
        </div>
      </div>
    </div>
  );
};
export default ProfilePic;

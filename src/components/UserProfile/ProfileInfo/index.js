import React, { useEffect } from "react";
import { faBirthdayCake, faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import Contact from "./Contact";
import "../style.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state);
  const [userInfo, setUserInfo] = React.useState(null);

  const info = (x) => {
    dispatch({ type: "change", payload: x });
  };

  useEffect(() => {
    console.log('flag')
    axios.get("http://localhost:9007/profiles/1").then((response) => {
      info(response.data);
    });
    
  }, []);

  console.log(profile)

  if (!profile) return null;

  return (
    <div className="container" style={{ textAlign: "left" }}>
      <div className="col">
        <div className="row">
          <div className="col">
            <p>
              {profile.name}
              {profile.id}
              Mark Watson
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {/* <p>{userInfo.dateOfBirth}</p> */}
            <p><FontAwesomeIcon icon={faBirthdayCake} size="sm" /> Dec 25, 1998</p>
          </div>
          <div className="col">
            {/* <p>{userInfo.gender}</p> */}
            <p><FontAwesomeIcon icon={faMars} size="sm" /><FontAwesomeIcon icon={faVenus} size="sm" />  Male</p>
          </div>
        </div>
        <br />
        <div className="row">
          <div>
            <textarea
              maxLength={250}
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
              {/* {profile.bio} */}
              Hello I'm Mark
            </textarea>
          </div>
          <button
            class="contact-btn btn"
            // style={{ marginBottom: "100px" }}
            >
           {/* <Contact label="Contact"
          //  mailto={userInfo.email} 

           /> */}
           <a href="mailto: abc@test.com" target="_blank"> Contact</a>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileInfo;

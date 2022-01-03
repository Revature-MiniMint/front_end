import React, { useEffect } from "react";
import { faBirthdayCake, faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import "../style.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../../../profileSlice";

const ProfileInfo = (props) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
    }

    const [userInfo, setUserInfo] = useState({
        email: "Private",
        name: "Private",
        dob: "Private",
        gender: "Private",
        bio: "Private",
    })

    useEffect(() => {
        axios.post("http://localhost:10011/profiles/hidden/" + props.data.userId, viewerProfile.data.userId, { headers: headers })
            .then((response) => {
                setUserInfo(response.data);
            });
    }, []);

    const info = useSelector((state) => state.profile);
    const user = useSelector((state) => state.user);
    const viewerProfile = {
        ...info, ...user
    }

    if (!profile) return null;

    function checking(x) {
        if (
            x == null
        ) {
            return (
                <img width="50px" src="https://cdn.pixabay.com/photo/2021/01/11/21/22/candy-5909726_1280.png" />
            )
        } else {
            return (x)
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
                            {userInfo.alias}
                        </p>
                    </div>
                </div>
                <div className="row profile-info-gen">
                    <div className="col">
                        <p>
                            {/* {checking(profile.dob)} */}
                            <FontAwesomeIcon icon={faBirthdayCake} size="lg" />
                            &nbsp; {userInfo.dob}
                        </p>
                    </div>
                    <div className="col">
                        <p>
                            <FontAwesomeIcon icon={faMars} size="lg" />
                            <FontAwesomeIcon icon={faVenus} size="lg" />
                            {/* {checking(profile.gender)} */}
                            &nbsp;
                            {userInfo.gender}
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
                            {userInfo.bio}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="btn contact-btn"
                        style={{ marginBottom: "100px" }}
                        mailto={checking(profile.userEmail)}
                    >
                        {userInfo.email}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProfileInfo;
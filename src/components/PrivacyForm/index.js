import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivacyForm = () => {
    const [privacy, setPrivacy] = useState({
        name: "",
        email: "",
        dob: "",
        gender: "",
        bio: ""
    })

    const navigate = useNavigate();

    const info = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const profile = {
    ...info, ...user
  }

    // use effect test
    useEffect(() => {
        axios.get("http://localhost:10011/privacy/" + profile.userId, privacy)
        .then((response) => {
            setPrivacy(response.data);
        })
        .catch((error) => console.error(error));
    }, [])

    //update privacy
    function onSubmitHandler(e) {
        e.preventDefault()
        axios.put('http://localhost:10011/privacy/' + profile.userId, privacy)
        .then(response => {
            setPrivacy(response.data)
            console.log(response.data)
            navigate('/ProfilePage')
        })
        .catch(error => console.error(error))
    }

    function onChangeHandler(e) {
        setPrivacy({
            ...privacy,
            [e.target.name]: e.target.checked
        });
    }

    return (
        <div className="container short-content">
            <div className="row">
                <br />
                <div className="privacy-form col-12">
                    <h4>Privacy Form</h4>
                    <p>Update your privacy settings below.</p>

                    <form onSubmit={onSubmitHandler}>
                        <div className="form-check form-switch">
                            <label className="form-check-label" htmlFor="name"> Hide First & Last Name</label>
                            <input className="form-check-input" type="checkbox" id="name" name="name" checked={privacy.name} onChange={onChangeHandler} />

                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="dob" name="dob" checked={privacy.dob} onChange={onChangeHandler} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault"> Hide Date of Birth</label>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="gender" name="gender" checked={privacy.gender} onChange={onChangeHandler} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Hide Gender</label>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="bio" name="bio" checked={privacy.bio} onChange={onChangeHandler} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Hide Bio</label>
                        </div>
                        <div className="form-check form-switch">
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Hide Email</label>
                            <input className="form-check-input" type="checkbox" id="email" name="email" checked={privacy.email} onChange={onChangeHandler} />
                        </div>
                        <br />
                        <button type="submit" className="btn col-12">Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PrivacyForm;
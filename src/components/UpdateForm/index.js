import React, { useState } from 'react';
// import axios from 'axios';

const UpdateForm = () => {
    const [state, setState] = useState({
        username: "user",
        password: "password",
        email: "email@gmail.com",
        fullname: "Name",
        alias: "A",
        dob: "2021-12-23",
        gender: "male",
        bio: "",
        profilePic: null
    });
    // axios.get("url")
    // .then(response => {
    //     setState(response);
    // })
    // .catch(error => {
    //     console.error(error);
    // })
    let gender_male_input = (
        <input className="form-check-input" type="radio" id="gender_male" name="gender" value="male" onChange={onChangeHandler}/>
    );
    let gender_female_input = (
        <input className="form-check-input" type="radio" id="gender_female" name="gender" value="female" onChange={onChangeHandler}/>
    );
    if(state.gender === "male") {
        gender_male_input = (
            <input className="form-check-input" type="radio" id="gender_male" name="gender" value="male" checked onChange={onChangeHandler}/>
        );
    } else if (state.gender === "female") {
        gender_female_input = (
            <input className="form-check-input" type="radio" id="gender_female" name="gender" value="female" checked onChange={onChangeHandler}/>
        );
    }
    function onChangeHandler(event) {
        const target = event.target;
        if (target.name === "profilePic") {
            setState({
                ...state,
                [target.name]: URL.createObjectURL(target.files[0])
            });
        } else {
            setState({
                ...state,
                [target.name]: target.value
            });
        }
    }
    function onSubmitHandler(event) {
        event.preventDefault();
        console.log(state);
        // axios.post("url", state)
        // .then(response => {
        //     console.log(response);
        // })
        // .catch(error => {
        //     console.error(error);
        // })
    }
    function onInvalidHandler(event) {
        if(event.target.name === "fullname") {
            event.target.setCustomValidity("Please fill out your full name.");
        } else {
            event.target.setCustomValidity("Please fill out your " + event.target.name + ".");
        }
    }
    return (
        <div className='container'>
        <form onSubmit={onSubmitHandler}>

            <div className="form-group mb-3">
                {/* enctype="multipart/form-data" */}
                <label className="form-label" htmlFor="profilePic">Profile Image</label>
                <input className="form-control" type="file" id="profilePic" name="profilePic" accept=".jpeg,.png" onChange={onChangeHandler}/>
                <img src={state.profilePic} alt=""/>
                </div>

            <div className="form-group mb-3">
                <label className="form-label" htmlFor="fullname">First Name, Last Name</label>
                <input className="form-control" type="text" id="fullname" name="fullname" value={state.fullname} required onInvalid={onInvalidHandler} onChange={onChangeHandler}/>
            </div>

            <div className="form-group mb-3">
                <label className="form-label" htmlFor="alias">Alias</label>
                <input className="form-control" type="text" id="alias" name="alias" value={state.alias} required onInvalid={onInvalidHandler} onChange={onChangeHandler}/>
            </div>

            <div className="form-group mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input className="form-control" type="email" id="email" name="email" value={state.email} required onInvalid={onInvalidHandler} onChange={onChangeHandler}/>
            </div>

            <div className="form-group mb-3">
                <label className="form-label" htmlFor="username">Username</label>
                <input className="form-control" type="text" id="username" name="username" value={state.username} required onInvalid={onInvalidHandler} onChange={onChangeHandler}/>
            </div>

            <div className="form-group mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <input className="form-control" type="password" id="password" name="password" value={state.password} required onInvalid={onInvalidHandler} onChange={onChangeHandler}/>
            </div>

            <div className="form-group mb-3">
                <label className="form-label" htmlFor="dob">Date of Birth</label>
                <input className="form-control" type="date" id="dob" name="dob" value={state.dob} onChange={onChangeHandler}/>
            </div>

            <div className="form-check form-check-inline">
                {gender_male_input}
                {/* <input className="form-check-input" type="radio" id="gender_male" name="gender" value="male" onChange={onChangeHandler}/> */}
                <label className="form-label" htmlFor="gender_male">Male</label>
            </div>

            <div className="form-check form-check-inline">
                {gender_female_input}
                {/* <input className="form-check-input" type="radio" id="gender_female" name="gender" value="female" onChange={onChangeHandler}/> */}
                <label className="form-label" htmlFor="gender_female">Female</label>
            </div>

            <div className="form-group mb-3">
                <label className="form-label" htmlFor="bio">Bio</label>
                <input className="form-control" type="text" id="bio" name="bio" value={state.bio} onChange={onChangeHandler}/>
            </div>
            <div className="text-center">
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
        </div>
    );
}

export default UpdateForm;
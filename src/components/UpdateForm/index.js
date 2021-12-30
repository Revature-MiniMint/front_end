import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

const UpdateForm = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state);
    const premade = {
        id: user.id, //id: 1,
        username: user.username, //username: "user",
        password: user.password, //password: "password",
        email: user.email, //email: "email@gmail.com",
        name: user.name, //name: "Name",
        alias: user.alias, //alias: "A",
        dob: user.dob, //dob: "2021-12-23",
        gender: user.gender, //gender: "male",
        bio: user.bio, //bio: "My bio",
        profilepic: user.profilepic //profilepic: new Blob()
    }
    const [state, setState] = useState({
        ...premade
        // id: 0,
        // username: "",
        // password: "",
        // email: "",
        // name: "",
        // alias: "",
        // dob: "",
        // gender: "",
        // bio: "",
        // profilepic: new Blob()
    });
    // useEffect(() => {
    //     axios.get("http://localhost:10011/profiles/" + state.id)
    //     .then(response => {
    //         console.log(response.data);
    //         setState(response.data);
    //     })
    //     .catch(error => {console.error(error);})
    //     axios.get("https://minimint.s3.us-east-1.amazonaws.com/" + state.id)
    //     .then(response => {
    //         console.log(response.data)
    //         setState({
    //             ...state,
    //             profilepic: response.data.image
    //         })
    //     })
    // }, [state]);
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
        if (target.name === "profilepic") {
            let file = target.files[0];
            file.arrayBuffer().then((arrayBuffer) => {
                let blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
                setState({
                    ...state,
                    [target.name]: blob
                })
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
        // const {profilepic, ...profile} = state;
        // axios.put("http://localhost:10011/profiles/" + state.id, profile)
        // .then(response => {
        //     console.log(response);
        //     dispatch({ type: "updateProfileInfo", payload: profile }); //needs updating
        // })
        // .catch(error => {console.error(error);})
        // var formData = new FormData();
        // formData.append("image", state.profilepic);
        // axios.post("http://localhost:10011/profiles/" + state.id + "/profile_pic", formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        // .then(response => {
        //     console.log(response);
        //     dispatch({ type: "updateProfilePic", payload: profile });
        // })
        // .catch(error => {console.error(error);})
    }
    function onInvalidHandler(event) {
        event.target.setCustomValidity("Please fill out your " + event.target.name + ".");
    }
    return (
        <div className='container'>
        <form onSubmit={onSubmitHandler}>
            <div className="row">
                <div className="col">
                    <div className="form-group mb-3">
                        <div className='text-center'>
                            <img id="image" src={URL.createObjectURL(state.profilepic)} alt="" style={{
                                objectFit: 'fill',
                                width: '300px',
                                height: '300px',
                                borderRadius: '50%',
                            }}/>
                        </div>
                        <label className="form-label" htmlFor="profilepic">Profile Image</label>
                        <input className="form-control" type="file" id="profilepic" name="profilepic" accept=".jpeg,.png" onChange={onChangeHandler}/>
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="bio">Bio</label>
                        <input className="form-control" type="text" id="bio" name="bio" value={state.bio} onChange={onChangeHandler}/>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <input className="form-control" type="text" id="name" name="name" value={state.name} required onInvalid={onInvalidHandler} onChange={onChangeHandler}/>
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
                        <label className="form-label" htmlFor="gender_male">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        {gender_female_input}
                        <label className="form-label" htmlFor="gender_female">Female</label>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </div>
        </form>
        </div>
    );
}

export default UpdateForm;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../../profileSlice";

const UpdateForm = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const profile = useSelector((state) => state.profile);
    const [state, setState] = useState({
        ...user,
        ...profile
    });
 
    useEffect(() => {
        if (!profile.id) {
        axios.get("http://localhost:10011/profiles/" + user.userId)
            .then(response => {
                console.log(response.data);
                setState(response.data);
            })
            .catch(error => { console.error(error); })
        }
    }, []);

    let gender_male_input = (
        <input className="form-check-input" type="radio" id="gender_male" name="gender" value="male" onChange={onChangeHandler} />
    );
    let gender_female_input = (
        <input className="form-check-input" type="radio" id="gender_female" name="gender" value="female" onChange={onChangeHandler} />
    );
    if (state.gender === "male") {
        gender_male_input = (
            <input className="form-check-input" type="radio" id="gender_male" name="gender" value="male" checked onChange={onChangeHandler} />
        );
    } else if (state.gender === "female") {
        gender_female_input = (
            <input className="form-check-input" type="radio" id="gender_female" name="gender" value="female" checked onChange={onChangeHandler} />
        );
    }
    function onChangeHandler(event) {
        const target = event.target;
        setState({
            ...state,
            [target.name]: target.value
        });
        // if (target.name === "profilepic") {
        //     let file = target.files[0];
        //     file.arrayBuffer().then((arrayBuffer) => {
        //         let blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
        //         setState({
        //             ...state,
        //             [target.name]: blob
        //         })
        //     });
        // } else {
        //     setState({
        //         ...state,
        //         [target.name]: target.value
        //     });
        // }
    }
    function onSubmitHandler(event) {
        event.preventDefault();
        console.log(state);
        const { profilepic, ...profileinfo } = state;
        axios.put("http://localhost:10011/profiles/" + user.userId, profileinfo)
            .then(response => {
                console.log(response);
                dispatch(userInfo(response.data));
            })
            .catch(error => { console.error(error); })
        // var formData = new FormData();
        // formData.append("image", state.profilepic);
        // axios.post("http://localhost:10011/profiles/" + state.id + "/profile_pic", formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        // .then(response => {
        //     console.log(response);
        //     dispatch({ type: "userInfo", payload: state });
        // })
        // .catch(error => {console.error(error);})
        console.log(state)
    }
    function onInvalidHandler(event) {
        // TODO:
        // event.target.setCustomValidity("Please fill out your " + event.target.name + ".");
    }
    return (
        <div className='container'>
            <div className="row">
                <br />
                <div className="update-form">
                    <h4>Update Form</h4>
                    <p>Update your information below.</p>
                    <form onSubmit={onSubmitHandler}>
                        {/* <div className="form-group mb-3">
                        <div className='text-center'>
                            <img id="image" src={URL.createObjectURL(state.profilepic)} alt="" style={{
                                objectFit: 'fill',
                                width: '300px',
                                height: '300px',
                                borderRadius: '50%',
                            }}/>
                        </div>
                        <label className="form-label" htmlFor="profilepic">Profile Image</label>
                        <input className="form-control" type="file" id="profilepic" name="profilepic" accept=".jpeg,.png" onChange={onChangeHandler}/></div> */}
                        {/* </div><div className="col"> */}
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="name">Full Name</label>
                            <input className="form-control" type="text" id="name" name="name" value={state.name} required onInvalid={onInvalidHandler} onChange={onChangeHandler} />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="bio">Bio</label>
                            <input className="form-control" type="text" id="bio" name="bio" value={state.bio} onChange={onChangeHandler} />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="alias">Alias</label>
                            <input className="form-control" type="text" id="alias" name="alias" value={state.alias} required onInvalid={onInvalidHandler} onChange={onChangeHandler} />
                        </div>
                
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="dob">Date of Birth</label>
                            <input className="form-control" type="date" id="dob" name="dob" value={state.dob} onChange={onChangeHandler} />
                        </div>
                        <div className="form-check form-check-inline">
                            {gender_male_input}
                            <label className="form-label" htmlFor="gender_male">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            {gender_female_input}
                            <label className="form-label" htmlFor="gender_female">Female</label>
                        </div>
                        <br />
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input className="form-control" type="password" id="password" name="password" value={state.password} required onInvalid={onInvalidHandler} onChange={onChangeHandler} />
                        </div>
                        <div className="text-center">
                            <button className="btn col-12" type="submit">Submit</button>
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateForm;
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { imgErrorHandler } from '../../imgErrorHandler';

const UpdatePicture = () => {
    const user = useSelector((state) => state.user);
    var image = "https://minimint.s3.us-east-1.amazonaws.com/" + user.userId;
    function onChangeHandler(event) {
        let file = event.target.files[0];
        file.arrayBuffer().then((arrayBuffer) => {
            let blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
            image = (URL.createObjectURL(blob));
        });
    }
    function onSubmitHandler(event) {
        event.preventDefault();
        var formData = new FormData();
        var imagefile = document.getElementById('profilepic');
        formData.append("image", imagefile.files[0]);
        console.log(formData)
        axios.post("http://localhost:10011/profiles/" + user.userId + "/profile_pic", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response);
                document.getElementById("image").src += "?" + new Date().getTime();
                console.log(document.getElementById("image").src)
            })
            .catch(error => { console.error(error); })
    }
    function onLoadHandler(event) {
        console.log("image get success");
    }
    return (
        <div className='container short-content'>
            <div className='row'>
                <br />
                <div className='pic-form'>
                    <form onSubmit={onSubmitHandler}>
                        <h4>Update Profile Picture</h4>
                        <p>Update your profile picture below.</p>
                        <div className="form-group mb-3">
                            <div className='text-center'>
                                <img id="image" src={image} alt="" style={{
                                    objectFit: 'fill',
                                    width: '300px',
                                    height: '300px',
                                    borderRadius: '50%',
                                }} onError={imgErrorHandler} />
                            </div>
                            <label className="form-label" htmlFor="profilepic">Profile Image</label>
                            <input className="form-control" type="file" id="profilepic" name="profilepic" accept=".jpeg,.png" onChange={onChangeHandler} />
                        </div>
                        <div className="text-center">
                            <button className="btn col-12" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdatePicture;
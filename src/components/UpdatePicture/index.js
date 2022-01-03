import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

const UpdatePicture = () => {
    // const dispatch = useDispatch();
    const user = { userId: 2 };
    // const user = useSelector((state) => state.user);
    const [image, setImage] = useState("https://minimint.s3.us-east-1.amazonaws.com/" + user.userId);
    function onChangeHandler(event) {
        let file = event.target.files[0];
        file.arrayBuffer().then((arrayBuffer) => {
            let blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
            setImage(URL.createObjectURL(blob));
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
                setImage(response.data)
            })
            .catch(error => { console.error(error); })
    }
    function onLoadHandler(event) {
        console.log("image get success");
    }
    function onErrorHandler(event) {
        console.log("image get fail");
        document.getElementById("image").setAttribute("src", "https://minimint.s3.us-east-1.amazonaws.com/2")
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
                                }} onLoad={onLoadHandler} onError={onErrorHandler} />
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
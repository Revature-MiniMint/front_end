import React, { useState, useEffect } from "react";
import "./post.css";
import profile from "./profile.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import { URL_PREFIX, PROFILE_PIC_URL_PREFIX } from "../../url_constants";
import { imgErrorHandler } from "../../imgErrorHandler";
import { useNavigate } from "react-router";

const URL_TO_POST = `${URL_PREFIX}/postfeed/addnew`;

/* This component allows user to create
a new post. */
const CreatePost = () => {
    const navigate = useNavigate();
    
    /* The state of the form. */
    const [postDescription, setPostDescription] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postUser, setPostUser] = useState(0);

    const info = useSelector((state) => state.profile);
    const user = useSelector((state) => state.user);
    const profile = {
      ...info, ...user
    }

    useEffect(() => {
        setPostUser(profile.userId);
    }, [])

    /* Submitting the post: */
    const onPostHandler = (e) => {
        e.preventDefault();
        var date = new Date(Date.now());

        const postDetails = {
            userId: postUser,
            title: postTitle,
            description: postDescription,
            creationDate: date.toISOString(),
            downmints: 0,
            upmints: 0,
        }

        axios.post(URL_TO_POST, postDetails)
        .then(response => {})
        .catch(error => console.error(error))
        
        navigate('/FeedPage');
    }

  return (
    <div>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-8">
                            <div className="post-card card">
                                <div className="card-header">
                                    <img src={PROFILE_PIC_URL_PREFIX + postUser} onError={imgErrorHandler}></img>
                                    <h3 className="card-title">{profile.alias} </h3>
                                    <span className="date" id='date-time'>{Date()}</span>
                                </div>
                                <div className="post-body card-body">
                                    <div>
                                        <form onSubmit={onPostHandler}>
                                            <div className="col-auto">
                                                <label for="inputPassword6" style={{ fontWeight: "bold" }} className="col-form-label">Title Mint</label>
                                            </div>
                                            <div className="col-md">
                                                <input type="textarea" id="" className="form-control" placeholder="enter the title of the mintost" onChange={(event) => setPostTitle(event.target.value)} />
                                            </div>
                                            <br></br>
                                            <div className="mb-3">
                                                <textarea style={{ height: "" }} className="form-control" id="" placeholder="Write a Mintost" onChange={(event) => setPostDescription(event.target.value)}></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-danger">Post</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            

                            <br></br>


                        </div>
                        {/* <!--col-md-8 ends --> */}
                    </div>
                </div>
            </section>
        </div>
  );
};

export default CreatePost;

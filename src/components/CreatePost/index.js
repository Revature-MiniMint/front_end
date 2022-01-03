import React, { useState, useEffect } from "react";
import "./post.css";
import profile from "./profile.jpg";
import axios from "axios";
import { URL_PREFIX } from "../../url_constants";

const URL_TO_POST = `${URL_PREFIX}/postfeed/addnew`;;

/* This component allows user to create
a new post. */
const CreatePost = () => {

    /* The state of the form. */
    const [postDescription, setPostDescription] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postUser, setPostUser] = useState(0);

    useEffect(() => {
        setPostUser(1);
    }, [])

    /* Submitting the post: */
    const onPostHandler = () => {

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
    }

  return (
    <div>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <img src={profile}></img>
                                    <h3 className="card-title">{postUser} Posts </h3>
                                    <span className="date" id='date-time'>{Date()}</span>
                                </div>
                                <div className="card-body">
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

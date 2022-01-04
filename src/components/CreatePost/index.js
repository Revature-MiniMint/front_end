import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { URL_PREFIX, PROFILE_PIC_URL_PREFIX } from "../../url_constants";
import { imgErrorHandler } from "../../imgErrorHandler";

const URL_TO_POST = `${URL_PREFIX}/postfeed/addnew`;

/* This component allows user to create
a new post. */
const CreatePost = () => {

    /* The state of the form. */
    const [postDescription, setPostDescription] = useState("");
    const[postTitle, setPostTitle] = useState("");
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
    <div className="card rounded">
      <div className="card-header">
        <div className="row">
          <div className="col-sm-1">
            <img
              src={PROFILE_PIC_URL_PREFIX + postUser}
              alt="profile-pic"
              className="rounded-circle "
              height="60px"
              width="60px"
              onError={imgErrorHandler}
            />
          </div>
          <div className="col-sm-3">
            <div>{postUser}</div>
            <div>Composing...</div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="jumbotron bg-light border">
          <form onSubmit = {onPostHandler}>
            <input type="text" name="" id="" placeholder="enter the title of the mintost:" style={{width:"100%", fontSize:"1.6em", padding:"0.4em"}}onChange={(event) => setPostTitle(event.target.value)}/>
            <hr className="my-4" />
            <div className="border content-box">
              <textarea name="" id="" style={{width: "100%", padding:"0.75em", fontSize: "1.2em"}} rows="10" placeholder="Enter the content of your mintost" onChange={(event) => setPostDescription(event.target.value)}></textarea>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-3">
                <button type = 'submit'>Post</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

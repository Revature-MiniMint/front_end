import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import "./style.css";
import ReactButton from "../../../ReactButton";
import LikeDislike from "../../../Like_Dislike";
import { PROFILE_PIC_URL_PREFIX } from "../../../../url_constants";
import { imgErrorHandler } from "../../../../imgErrorHandler";
import {Link} from "react-router-dom";

const FeedItem = (props) => {
  // time since the post was made:
  const [timeSince, setTimeSince] = useState("");
  const [, setReactions] = useState([]);
  // how many reactions the post has:
  const [reactionsCount, setReactionsCount] = useState({
    THUMBSUP: 0,
    THUMBSDOWN: 0,
    LAUGH: 0,
    CRY: 0,
    SMILE: 0,
    FROWN: 0,
    ANGRY: 0,
    HEART: 0
  })

  // update reactions count when a new reaction is made:
  const updateCount = (updatedReactions) => {
    var tempReactionCount = {
      THUMBSUP: 0,
      THUMBSDOWN: 0,
      LAUGH: 0,
      CRY: 0,
      SMILE: 0,
      FROWN: 0,
      ANGRY: 0,
      HEART: 0
    }
    for (var i = 0; i < updatedReactions.length; i++) {
      tempReactionCount[updatedReactions[i].reaction]++;
    }
    // update state:
    setReactionsCount(tempReactionCount);
    setReactions(updatedReactions);
  }

  //User information, set top private by default
  const [userInfo, setUserInfo] = useState({
    alias : "Private"
  })

  const info = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const profile = {
    ...info, ...user
  }

  //Used to pass a single digit through to the backend
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  }

  useEffect(() => {
    //Obtain data of commenter, will not display private info of another user
    axios.post("http://localhost:10011/profiles/hidden/" + props.data.userId, profile.userId, {headers:headers})
      .then(response => {
        setUserInfo(response.data)
      })
      .catch((error) => {
        console.error(error); //Print error to console
    })


    setReactions(props.data.reactionList);

    // when post is rendered, count how many of each reactions:
    var tempReactionCount = {
      THUMBSUP: 0,
      THUMBSDOWN: 0,
      LAUGH: 0,
      CRY: 0,
      SMILE: 0,
      FROWN: 0,
      ANGRY: 0,
      HEART: 0
    }
    for (var i = 0; i < props.data.reactionList.length; i++) {
      tempReactionCount[props.data.reactionList[i].reaction]++;
    }
    setReactionsCount(tempReactionCount);

    // manually add Z because MySQL drops it for some reason...
    let date = new Date(props.data.creationDate + 'Z');

    // calculate time since post was made:
    const seconds = (Date.now() - date.getTime()) / 1000;
    if (seconds < 60) {
      setTimeSince(Math.floor(seconds) + " secs ago");
    } else if (seconds < 3600) {
      setTimeSince(Math.floor(seconds / 60) + " mints ago");
    } else if (seconds < 86400) {
      setTimeSince(Math.floor(seconds / 3600) + " hours ago");
    } else if (seconds < 604800) {
      setTimeSince(Math.floor(seconds / 86400) + " days ago");
    } else if (seconds < 2592000) {
      setTimeSince(Math.floor(seconds / 604800) + " weeks ago");
    } else {
      setTimeSince(Math.floor(seconds / 2592000) + " months ago");
    }
  },[props.data]);
  
  return (
    <div className="feed-item">
      <div className="card rounded">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-1">
            <Link to={'/ProfilePageOther'} state={props}>
              <img
                src={PROFILE_PIC_URL_PREFIX + props.data.userId}
                alt="profile-pic"
                className="rounded-circle "
                height="60px"
                width="60px"
                onError={imgErrorHandler}
              />
            </Link>
            </div>
            <div className="col-sm-3 post-item-header">
              <div>{userInfo.alias}</div>
              <div className="text-secondary">{timeSince}</div>
            </div>
          </div>
        </div>
        <div className="card-body post-item-body">
          <div className="jumbotron bg-light border">
            <h1 className="display-5">{props.data.title}</h1>
            <hr className="my-4" />
            <div className="border content-box">
              <p>{props.data.description}</p>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-7 reactions">
                <div>
                  <ReactButton data = {props.data} counts = {reactionsCount} updateCount = {updateCount}/>
                </div>
              </div>
              {/* TODO: Route this to post item component: */}
              <div className="col-sm-5 like-dislike">
                <LikeDislike data={props.data} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 view-post">
                <Link to={`/post/${props.data.id}`}
                  className="btn btn-secondary btn-lg btn-block"
                >
                  View Full Post
                </Link>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default FeedItem;
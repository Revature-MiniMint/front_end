import React, { useEffect, useState } from "react";
import "./style.css";
import ReactButton from "../../ReactButton";
import LikeDislike from "../../Like_Dislike";
import { PROFILE_PIC_URL_PREFIX } from "../../../url_constants";
import { imgErrorHandler } from "../../../imgErrorHandler";

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
  

  useEffect(() => {

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
    <div>
      <div className="card rounded">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-1">
              <img
                src={PROFILE_PIC_URL_PREFIX + props.data.userId}
                alt="profile-pic"
                className="rounded-circle "
                height="60px"
                width="60px"
                onError={imgErrorHandler}
              />
            </div>
            <div className="col-sm-3">
              <div>{"user id: " + props.data.userId}</div>
              <div className="text-secondary">{timeSince}</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="jumbotron bg-light border">
            <h1 className="display-5">{props.data.title}</h1>
            <hr className="my-4" />
            <div className="border content-box">
              <p>{props.data.description}</p>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-3">
                <div>
                  <ReactButton data = {props.data} counts = {reactionsCount} updateCount = {updateCount}/>
                </div>
              </div>
              {/* TODO: Route this to post item component: */}
              <div className="col-sm-3">
                <button
                  className="btn btn-secondary btn-lg btn-block"
                >
                  View Full Post
                </button>
              </div>
              <LikeDislike data={props.data} />
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

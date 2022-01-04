import React, { useEffect, useState } from "react";
import axios from "axios";
import Comments from "./Comments";
import ReactButton from "../ReactButton";
import { URL_PREFIX, PROFILE_PIC_URL_PREFIX } from "../../url_constants";
import { imgErrorHandler } from "../../imgErrorHandler";
import LikeDislike from "../Like_Dislike";

const URL_TO_GET_REACTIONS = `${URL_PREFIX}/reactions/postId/`;

// Get the reactions for the given post and return them
async function retrieveReactionsOfPost(postId) {
  return axios
    .get(URL_TO_GET_REACTIONS + postId)
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

const PostItem = (props) => {
  // time since post was created
  const [timeSince, setTimeSince] = useState("");
  const [, setReactions] = useState([]);
  // amount of reactions for this post:
  const [reactionsCount, setReactionsCount] = useState({
    THUMBSUP: 0,
    THUMBSDOWN: 0,
    LAUGH: 0,
    CRY: 0,
    SMILE: 0,
    FROWN: 0,
    ANGRY: 0,
    HEART: 0,
  });

  // update reaction count when a reaction is added:
  const updateCount = (updatedReactions) => {
    var tempReactionCount = {
      THUMBSUP: 0,
      THUMBSDOWN: 0,
      LAUGH: 0,
      CRY: 0,
      SMILE: 0,
      FROWN: 0,
      ANGRY: 0,
      HEART: 0,
    };
    for (var i = 0; i < updatedReactions.length; i++) {
      tempReactionCount[updatedReactions[i].reaction]++;
    }
    // update state:
    setReactionsCount(tempReactionCount);
    setReactions(updatedReactions);
  };

  useEffect(() => {
    setReactions(props.data.reactionList);

    // when component renders, count up reactions for this post:
    var tempReactionCount = {
      THUMBSUP: 0,
      THUMBSDOWN: 0,
      LAUGH: 0,
      CRY: 0,
      SMILE: 0,
      FROWN: 0,
      ANGRY: 0,
      HEART: 0,
    };
    for (var i = 0; i < props.data.reactionList.length; i++) {
      tempReactionCount[props.data.reactionList[i].reaction]++;
    }
    setReactionsCount(tempReactionCount);

    // get the reactions for this post:
    const fetchReactions = async (postId) => {
      const result = await retrieveReactionsOfPost(postId);
      setReactions(result);
    };
    fetchReactions(props.data.id);
    let date = new Date(props.data.creationDate + "Z");

    // calculate time since post was created:
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
  }, [props.data]);

  let prettyDate = new Date(props.data.creationDate);
  return (
    <div className="container post-item">
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
            <div className="col-sm-3 post-item-header">
              <div>{"user id: " + props.data.userId}</div>
              <div className="text-secondary">{timeSince}</div>
              <p>
                On {prettyDate.getMonth() + 1}/{prettyDate.getDate()}/
                {prettyDate.getFullYear()} at {prettyDate.getHours()}:
                {prettyDate.getMinutes() < 10
                  ? "0" + prettyDate.getMinutes()
                  : prettyDate.getMinutes()}
                {prettyDate.getHours() < 12 ? "am" : "pm"}
              </p>
            </div>
          </div>
        </div>
        <div className="card-body post-item-body">
          <div className="jumbotron bg-light border">
            <h1 className="display-6">{props.data.title}</h1>
            <hr className="my-4" />
            <div className="border content-box">
              <p>{props.data.description}</p>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-6 reactions">
                <div>
                  {props.data.id && (
                    <ReactButton
                      data={props.data}
                      counts={reactionsCount}
                      updateCount={updateCount}
                    />
                  )}
                </div>
              </div>
              <div className="col-sm-6 like-dislike">
                {props.data.id && <LikeDislike data={props.data} />}
              </div>
            </div>
            <br />
          </div>

          {props.data.id && <Comments post={props.data} />}
        </div>
      </div>
      <br />
    </div>
  );
};

export default PostItem;

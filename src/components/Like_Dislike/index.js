import React, { useState, useEffect } from "react";
import mintUp from "../../imgs/mintUp.png"
import mintDown from "../../imgs/mintDown.png"
import mintUpUnClicked from "../../imgs/mintUpUnclicked.png"
import mintDownUnClicked from "../../imgs/mintDownUnclicked.png"
import axios from "axios";
import { URL_PREFIX } from "../../url_constants";

/* This component is used to display the like and dislike buttons for a post. 
    It takes in a post object as a prop so it knows which post to update */
function LikeDislike(props) {

    const [postLikes, setPostLikes] = useState({
        numLikes: props.data.upmints,
        numDislikes: props.data.downmints,
        // true if upmint button is active(green), false otherwise
        disableLike: false,
        // true if downmint button is active(green), false otherwise
        disableDislike: false,
    });

    // when we click a mint:
    function onClickHandler(event){
        // like a post if the user hasn't liked it yet
        if(event.target.value === "like" && !postLikes.disableDislike){
            setPostLikes({
                ...postLikes,
                numLikes: (postLikes.numLikes + 1),
                disableLike: true,
                disableDislike: false,
            })
        // dislike a post if the user hasn't disliked it yet
        }else if(event.target.value === "dislike" && !postLikes.disableLike){
            setPostLikes({
                ...postLikes,
                numDislikes: (postLikes.numDislikes + 1),
                disableDislike: true,
                disableLike: false,
            })
        // like a post if the user already disliked it
        }else if(event.target.value === "like" && postLikes.disableDislike){
            setPostLikes({
                ...postLikes,
                numLikes: (postLikes.numLikes + 1),
                numDislikes: (postLikes.numDislikes - 1),
                disableLike: true,
                disableDislike: false,
            })
        // dislike a post if the user already liked it
        }else if(event.target.value === "dislike" && postLikes.disableLike){
            setPostLikes({
                ...postLikes,
                numLikes: (postLikes.numLikes - 1),
                numDislikes: (postLikes.numDislikes + 1),
                disableDislike: true,
                disableLike: false,
            })
        // undo a like if the user already liked it
        }else if(event.target.value === "cancel" && postLikes.disableLike){
            setPostLikes({
                ...postLikes,
                numLikes: (postLikes.numLikes - 1),
                disableLike: false,
                disableDislike: false,
            })
        // undo a dislike if the user already disliked it
        }else if(event.target.value === "cancel" && postLikes.disableDislike){
            setPostLikes({
                ...postLikes,
                numDislikes: (postLikes.numDislikes - 1),
                disableDislike: false,
                disableLike: false,
            })
        }
    }

    // get the initial number of likes and dislikes for the post
    useEffect(() => {
        var post = props.data;
        post.upmints = postLikes.numLikes;
        post.downmints = postLikes.numDislikes;
        axios.put(`${URL_PREFIX}/posts`, post)
        .then(response => {})
    }, [postLikes, props.data])

    // buttons to like and dislike a post
    const elementUp = (<input height="120" type="image" onClick={onClickHandler} value="like" src={mintUpUnClicked} alt = 'upmint' draggable="false" />)
    const elementUpClicked = (<input height="120" type="image" onClick={onClickHandler} value="cancel" src={mintUp} alt = 'upmint' draggable="false" />)
    const elementDown = (<input height="120" type="image" onClick={onClickHandler} value="dislike" src={mintDownUnClicked} alt = 'downmint'draggable="false" />)
    const elementDownClicked = (<input height="120" type="image" onClick={onClickHandler} value="cancel" src={mintDown} alt = 'downmint'draggable="false" />)

    return (
        <div>
            {postLikes.disableLike? elementUpClicked : elementUp} {postLikes.numLikes} upmints
            {postLikes.disableDislike? elementDownClicked : elementDown} {postLikes.numDislikes} downmints
        </div>
    )
}


export default LikeDislike

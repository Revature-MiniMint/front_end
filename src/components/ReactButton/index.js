import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { URL_PREFIX } from '../../url_constants';
import {useSelector} from 'react-redux';
import "./style.css";

const URL_TO_GET_REACTIONS = `${URL_PREFIX}/reactions/postId/`;
const URL_TO_POST_REACTIONS = `${URL_PREFIX}/reactions/`;
const URL_TO_UPDATE_REACTIONS = `${URL_PREFIX}/reactions/update/`;

// Get the reactions for the given post and return them
async function retrieveReactionsOfPost(postId){
    return axios.get(URL_TO_GET_REACTIONS+postId)
            .then(response => response.data)
            .catch(error => console.error(error))
  }

  /* This component contains the reaction buttons for a post: */
const ReactButton = (props) => {

    const info = useSelector((state) => state.profile);
    const user = useSelector((state) => state.user);
    const profile = {
      ...info,
      ...user,
    };


    // whether or not we show reactions:
    const [showReactions, setShowReactions] = useState(false)
    // list of reactions for this post:
    const[reactions, setReactions] = useState([]);

    // get reactions for this post:
    const fetchReactions = async (postId) => {
        const result = await retrieveReactionsOfPost(postId);
        setReactions(result);
  
      };
    
    useEffect(() => {
        fetchReactions(props.data.id)      
    },[props.data.id]);

    // update the post with the new reaction:
    const updateReaction = (event) =>{

        var userIdLoggedIn = profile.userId;
    
        // get the reaction type for the current user:
        const reactionForCurrentUser = reactions.find(reaction => reaction.userId === userIdLoggedIn);
    
        // reaction data:
        const data = {
          postId: props.data.id,
          userId: userIdLoggedIn,
          reaction: event.target.value,
        }
        
        // if this is the user's first reaction on this post:
        if(reactionForCurrentUser === undefined){
          axios.post((URL_TO_POST_REACTIONS+props.data.id), data)
          .then(response => {
            var newReactions = [ ...reactions, response.data]
            setReactions(newReactions);
            props.updateCount(newReactions);
          })
          .catch(error => console.error(error));
        } 
        // if this is not the user's first reaction, update the reaction:
        else {
          axios.put((URL_TO_UPDATE_REACTIONS+reactionForCurrentUser.reactionId), data)
          .then(response => {
            setReactions(reactions.map(reaction => reaction.reactionId === reactionForCurrentUser.reactionId ? response.data : reaction));
            props.updateCount(reactions.map(reaction => reaction.reactionId === reactionForCurrentUser.reactionId ? response.data : reaction));
        })
          .catch(error => console.error(error))
    
        }    
      }
    return(
        <div>
            <button className='react-btn' onClick={() => {setShowReactions(!showReactions)}}>React</button>
            {showReactions ? <><button onClick={updateReaction} value="THUMBSUP">&#x1F44D; {props.counts.THUMBSUP}</button>
            <button  onClick={updateReaction} value="THUMBSDOWN">&#x1F44E; {props.counts.THUMBSDOWN}</button>
            <button onClick={updateReaction} value="LAUGH">&#x1F923; {props.counts.LAUGH}</button>
            <button onClick={updateReaction} value="CRY">&#x1F622; {props.counts.CRY}</button>
            <button onClick={updateReaction} value="SMILE">&#x1F601; {props.counts.SMILE}</button>
            <button onClick={updateReaction} value="FROWN">&#x1F641; {props.counts.FROWN}</button>
            <button onClick={updateReaction} value="ANGRY">	&#x1F620; {props.counts.ANGRY}</button>
            <button onClick={updateReaction} value="HEART">	&#x1F496; {props.counts.HEART}</button></> : <></>}
        </div>
    )
}

export default ReactButton;
import axios from "axios";
import styles from './style.module.css';
import {useState, useEffect} from 'react';
import Replies from './Replies';
import AddReply from './AddReply';
import { URL_PREFIX } from "../../../../url_constants";

/* This component is a singular comment.
    A comment has a reply form, replies, and a delete button.
*/
const Comment = (props) => {
    // all current replies to this field:
    const [replies, setReplies] = useState([]);

    // delete comment from database:
    const deleteComment = () => {
        axios.delete(`${URL_PREFIX}/comments/${props.comment.id}`)
        // delete comment from state:
        .then(response => {
            props.setComments(props.comments.map(comment => {
                if (comment.id === props.comment.id) {
                    return response.data;
                }
                return comment;
            }))
        })
        .catch(error => console.error(error));
    }

    // get replies for this comment:
    useEffect(() => {
        // fetch replies to this comment:
        axios.get(`${URL_PREFIX}/comments/reply/${props.comment.id}`)
        // update state:
        .then(response => setReplies(response.data))
        .catch(err => console.error(err))
    }, [props.comment.id])

    return (
        <div className = {styles.comment}>
            {props.comment.description} by {props.comment.author}
            {/* <button className={styles.delete} onClick = {deleteComment}>X</button> */}
            <br/>
            {/* Reply Form: */}
            <AddReply replies = {replies} setReplies = {setReplies} postId = {props.postId} commentId = {props.comment.id}/>
            {/* Replies: */}
            <Replies postId = {props.postId} replies = {replies} setReplies = {setReplies}/>
        </div>
    )
}
export default Comment;
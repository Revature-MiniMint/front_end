import { useState } from "react";
import axios from "axios";
import { URL_PREFIX } from "../../../../../url_constants";


/* This component is a form to add a reply to a comment:
   Each comment component has a reply form associated with it.
*/
const AddReply = (props) => {

    // reply value of input field:
    const [reply, setReply] = useState("");

    // update the reply value:
    const onChangeHandler = (e) => {
        setReply(e.target.value);
    }

    // send reply to database:
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // don't send empty reply
        if (reply === "") {
            return;
        }
        // TODO: GET THIS NAME FROM THE USER
        var author = "Replier"
        var replyObject = {
            description: reply,
            date: Date.now(),
            author: author,
            parentComment: props.commentId
        }
        // send this reply to the server
        axios.post(`${URL_PREFIX}/comments/reply/${props.postId}`, replyObject)
        .then(response => {
            setReply("");
            props.setReplies([response.data, ...props.replies]);}
        )
        .catch(err => console.error(err))
    }
    
    return (
        <form onSubmit = {onSubmitHandler}>
            <input onChange = {onChangeHandler} value = {reply} placeholder="Reply"></input>
        </form>
    )
}

export default AddReply;
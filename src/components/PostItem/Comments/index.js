import Comment from './CommentItem';
import AddComment from './AddComment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_PREFIX } from '../../../url_constants';


/*
    This component holds all comments for a given post.
    It takes in a post object as a prop... mostly for the id
    so when we add a new comment, it knows which post to associate it with.
    Example:
    <Comments post = {post}/>
*/
const Comments = (props) => {

    // all of the comments for this post:
    const [comments, setComments] = useState([]);

    useEffect(() => {
        
        // fetch comments for this post from the database
        axios.get(`${URL_PREFIX}/comments/${props.post.id}`)
        // update state:
        .then(response => setComments(response.data))
        .catch(err => console.error(err))
    }, [props.post.id])
    
    return (
        <div style = {{ margin: 'auto', textAlign: 'left', padding: '10px'}}>
            <AddComment postId = {props.post.id} comments = {comments} setComments = {setComments}/>
            {comments.map(comment => <Comment  postId = {props.post.id} comment={comment} comments = {comments} setComments = {setComments} key={comment.id}/>)}
        </div>
    )
}

export default Comments;

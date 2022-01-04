import axios from 'axios';
import React from 'react'
import PostItem from '../../components/PostItem';
import { URL_PREFIX } from '../../url_constants';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router';

const PostPage = () => {
    const [post, setPost] = useState({});
    
    let params = useParams();
    useEffect(() => {   
        // get the post id from params:
        const postId = params.id;
        // URL_PREFIX is in src/url_constants.js
        axios.get(`${URL_PREFIX}/posts/${postId}`)
        .then(response => {
            setPost(response.data);
        })
        .catch(err => console.error(err))
    }, [])
    return (
        <div>
            {post.id && <PostItem data = {post}/>}
        </div>
    )
}

export default PostPage;
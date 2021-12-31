import axios from 'axios';
import React from 'react'
import PostItem from '../../components/PostItem';
import { URL_PREFIX } from '../../url_constants';
import {useState, useEffect} from 'react';

const PostPage = () => {
    const [post, setPost] = useState({});
    useEffect(() => {
        // TODO: Get this from route url
        const postId = 1;
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
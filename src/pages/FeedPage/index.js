import PostFeed from "../../components/PostFeed";

import React from "react";
import UserCheck from "../../components/checkUser/userCheck";
const FeedPage = () => {


    return (
        <div>
            <UserCheck/>
            <PostFeed />
        </div>
    )
}

export default FeedPage;
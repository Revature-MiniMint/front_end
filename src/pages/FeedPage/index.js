import PostFeed from "../../components/PostFeed";
import NavbarProfile from "../../components/Navbar";
import React from "react";
import UserCheck from "../../components/checkUser/userCheck";
const FeedPage = () => {


    return (
        <div>
            <NavbarProfile />
            <UserCheck/>
            <PostFeed />
        </div>
    )
}

export default FeedPage;
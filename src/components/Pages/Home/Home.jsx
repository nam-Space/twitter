import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFollows, getPosts } from "../../../redux/thunk";

import "../../../sass/home.scss";
import Post from "../../Post/Post";
import UploadStatus from "../../Upload/UploadStatus";

const Home = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const posts = useSelector((state) => state.posts);
    const followings = useSelector((state) => state.followings);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getFollows());

        if (!currentUser) {
            navigate("/login");
        }
    }, [posts.length, followings?.length]);

    return (
        <div className="home">
            <p className="home-navbar">Home</p>
            <UploadStatus />
            {posts
                .sort((a, b) => b.time - a.time)
                .map((post, index) => (
                    <Post key={index} post={post} />
                ))}
        </div>
    );
};

export default Home;

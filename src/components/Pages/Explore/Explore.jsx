import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollows, getUsers } from "../../../redux/thunk";

import "../../../sass/explore.scss";
import Search from "../../Search/Search";
import User from "../../User/User";

const Explore = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = useSelector((state) => state.users);
    const followings = useSelector((state) => state.followings);
    const followers = useSelector((state) => state.followers);

    const filterUsers = users.filter(
        (user) => user.email !== currentUser?.email
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getFollows());
    }, [users.length, followings.length, followers.length]);

    return (
        <div className="explore">
            <div className="explore-search">
                <Search />
            </div>
            <div className="explore-wrapper">
                <div className="explore-wrapper-everyone">
                    {filterUsers.map((user, index) => (
                        <User res={user} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Explore;

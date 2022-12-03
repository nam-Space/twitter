import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getUsers } from "../../redux/thunk";

import "../../sass/connectPeople.scss";
import Img from "../Img/Img";
import Search from "../Search/Search";
import User from "../User/User";

const ConnectPeople = () => {
    const location = useLocation();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = useSelector((state) => state.users);

    const usersFilter = users.filter(
        (user) => user.email !== currentUser?.email
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <div className="connect-people">
            {location.pathname !== "/explore" && <Search />}
            <div className="who-follow-container">
                <h4>Who to follow</h4>
                {usersFilter.slice(0, 3).map((user, index) => (
                    <User key={index} res={user} />
                ))}
                <Link to="/explore" className="explore-navigate">
                    Show More
                </Link>
            </div>
        </div>
    );
};

export default ConnectPeople;

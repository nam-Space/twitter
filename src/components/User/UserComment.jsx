import React from "react";
import { More } from "../../assets/icons/Icon";
import Img from "../Img/Img";

import "../../sass/userComment.scss";
import formatDate from "../../formatDate/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../redux/thunk";
import { Link } from "react-router-dom";

const UserComment = ({ comment }) => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const userComment = users.find((user) => user.id === comment.user_id);

    return (
        <div className="who-follow-user-comment-all">
            <Link to={`/profile/${userComment?.id}`}>
                <Img
                    url={userComment?.user_img}
                    className="who-follow-user-comment-all-img"
                />
            </Link>
            <div className="who-follow-user-comment-all-wrapper">
                <div className="who-follow-user-comment">
                    <div className="who-follow-user-wrapper">
                        <div className="who-follow-user-text">
                            <div className="who-follow-user-text-wrapper">
                                <p className="who-follow-user-text-name">
                                    <Link to={`/profile/${userComment?.id}`}>
                                        {userComment?.user_name}
                                    </Link>
                                </p>
                                <p className="who-follow-user-text-content">
                                    {comment.content}
                                </p>
                            </div>
                            <div className="who-follow-user-text-interact">
                                <p className="who-follow-user-text-interact-time">
                                    {formatDate(comment.time)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="who-follow-user-comment-more">
                        <More color="#535353" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserComment;

import React from "react";
import { More } from "../../assets/icons/Icon";
import Img from "../Img/Img";

import "../../sass/userComment.scss";
import formatDate from "../../formatDate/formatDate";

const UserComment = ({ comment, users }) => {
    const userComment = users.find((user) => user.id === comment.user_id);

    return (
        <div className="who-follow-user-comment-all">
            <Img
                url={userComment.user_img}
                className="who-follow-user-comment-all-img"
            />
            <div className="who-follow-user-comment-all-wrapper">
                <div className="who-follow-user-comment">
                    <div className="who-follow-user-wrapper">
                        <div className="who-follow-user-text">
                            <div className="who-follow-user-text-wrapper">
                                <p className="who-follow-user-text-name">
                                    {userComment.user_name}
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
                        <More width={24} height={24} color="#535353" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserComment;

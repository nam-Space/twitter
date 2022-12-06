import React, { useState } from "react";
import Img from "../Img/Img";

import "../../sass/currentUserComment.scss";
import { ImageIcon } from "../../assets/icons/Icon";
import { useDispatch } from "react-redux";
import { setComments } from "../../redux/thunk";

const CurrentUserComment = ({ post, user, action, writeResponseRef }) => {
    const [inputValue, setInputValue] = useState("");

    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.target.style.height = "40px";
        e.target.style.height = e.target.scrollHeight + "px";

        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            if (inputValue) {
                const time = Date.now();

                dispatch(
                    setComments({
                        post_id: post.id,
                        user_id: user.id,
                        content: inputValue,
                        ancestor_id: 0,
                        time: time,
                    })
                );

                setInputValue("");
                if (e.preventDefault) e.preventDefault();
            }
        }
    };

    return (
        <div
            ref={writeResponseRef}
            className={`${
                action === "reply"
                    ? "current-user-comment hide"
                    : "current-user-comment"
            } `}
        >
            <div className="current-user-comment-avatar">
                <Img
                    className="current-user-comment-avatar-img"
                    url={user?.user_img}
                />
            </div>
            <div className="current-user-comment-input-img">
                <div className="current-user-comment-input-img-wrapper">
                    <textarea
                        className="current-user-comment-input"
                        type="text"
                        placeholder="Write your comment..."
                        onKeyDown={handleSubmit}
                        value={inputValue}
                        onChange={handleChange}
                    />
                    <div className="current-user-comment-input-img-icon">
                        <input
                            type="file"
                            name="haha"
                            id="img-icon-comment"
                            className="img-icon"
                            onChange={handleChange}
                        />
                        <label htmlFor="img-icon-comment">
                            <ImageIcon color="var(--primary-color)" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentUserComment;

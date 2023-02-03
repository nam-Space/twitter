import React, { useEffect, useState } from "react";
import Img from "../Img/Img";

import "../../sass/currentUserComment.scss";
import { ImageIcon } from "../../assets/icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setComments } from "../../redux/thunk";
const CurrentUserComment = ({ post, writeResponseRef }) => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = useSelector((state) => state.users);

    currentUser = users.find((user) => user.email === currentUser?.email);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

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
                        user_id: currentUser.id,
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
        <div ref={writeResponseRef} className="current-user-comment">
            <div className="current-user-comment-avatar">
                <Img
                    className="current-user-comment-avatar-img"
                    url={currentUser?.user_img}
                />
            </div>
            <div className="current-user-comment-input-img">
                <div className="current-user-comment-input-img-wrapper">
                    <textarea
                        className="current-user-comment-input"
                        type="text"
                        placeholder="Write something..."
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

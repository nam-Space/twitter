import React, { useEffect, useRef, useState } from "react";
import Img from "../Img/Img";

import "../../sass/uploadStatus.scss";
import { ArrowDown, ImageIcon } from "../../assets/icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, uploadPost } from "../../redux/thunk";
import { Link } from "react-router-dom";

const UploadStatus = () => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = useSelector((state) => state.users);

    currentUser = users.find((user) => user.email === currentUser?.email);

    const [valueStatus, setValueStatus] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const buttonPost = useRef();
    const imgReviewRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const handleChange = (e) => {
        const validImageTypes = [
            "image/gif",
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (e.target.type !== "file") {
            e.target.style.height = "52px";
            e.target.style.height = `${e.target.scrollHeight}px`;
            setValueStatus(e.target.value);

            if (e.target.value) {
                buttonPost.current.classList.remove("disable");
            } else {
                buttonPost.current.classList.add("disable");
            }
        } else {
            if (validImageTypes.includes(e.target.files[0].type)) {
                imgReviewRef.current.classList.remove("disable");
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();

                    reader.addEventListener("load", () => {
                        imgReviewRef.current.src = reader.result;
                        setUrlImage(reader.result);
                        buttonPost.current.classList.remove("disable");
                    });

                    reader.readAsDataURL(file);
                }
            } else {
                alert("You need to choose the image file!");
            }
        }
    };

    const handleSubmit = (e) => {
        if (valueStatus || urlImage) {
            dispatch(
                uploadPost({
                    title: valueStatus,
                    img_url: urlImage,
                    time: Date.now(),
                    user_id: currentUser?.id,
                })
            );
            setValueStatus("");
            setUrlImage("");
            buttonPost.current.classList.add("disable");
            imgReviewRef.current.classList.add("disable");
        }
    };

    return (
        <div className="status-wrapper">
            <div>
                <Link to={`/profile/${currentUser?.id}`}>
                    <Img
                        url={currentUser?.user_img}
                        className="status-wrapper-img"
                    />
                </Link>
            </div>
            <div className="upload-wrapper">
                <button className="access-modifier-btn">
                    <div className="access-modifier">
                        <p>Everyone</p>
                        <div className="arrow">
                            <ArrowDown color="var(--primary-color)" />
                        </div>
                    </div>
                </button>
                <br />
                <textarea
                    className="status-input"
                    type="text"
                    placeholder="What's happening?"
                    onInput={handleChange}
                    value={valueStatus}
                />
                <img
                    ref={imgReviewRef}
                    src=""
                    alt=""
                    className="image-review disable"
                />
                <div className="wrapper-upload-other">
                    <input
                        type="file"
                        className="img-icon"
                        id="img-icon"
                        onChange={handleChange}
                    />
                    <label htmlFor="img-icon" className="upload-status-img">
                        <ImageIcon color="var(--primary-color)" />
                    </label>
                    <button
                        className="btn-upload-status disable"
                        onClick={handleSubmit}
                        ref={buttonPost}
                    >
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadStatus;

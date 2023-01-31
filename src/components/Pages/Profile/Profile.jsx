import React, { useEffect, useRef, useState } from "react";

import "../../../sass/profile.scss";
import Img from "../../Img/Img";
import { Calendar, Close, Picture } from "../../../assets/icons/Icon";
import Post from "../../Post/Post";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    editUser,
    getFollows,
    getPosts,
    getUsers,
    setFollow,
    unFollow,
} from "../../../redux/thunk";
import formatDate from "../../../formatDate/formatDate";
import Modal from "react-modal";
import userError from "../../../assets/images/userError.png";

const Profile = () => {
    const { id } = useParams();

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = useSelector((user) => user.users);
    const user = users.find((user) => user.id === Number(id));
    currentUser = users.find((user) => user.email === currentUser?.email);
    const followings = useSelector((state) => state.followings);
    const posts = useSelector((state) => state.posts);

    const userFollowings = followings.filter(
        (follow) => follow.user_id === Number(id)
    );
    const userFollowers = followings.filter(
        (follow) => follow.user_id_following === Number(id)
    );

    const selectedUserFollow = followings.find(
        (follow) =>
            follow.user_id === currentUser?.id &&
            follow.user_id_following === Number(id)
    );

    const userPosts = posts.filter((post) => post.user_id === Number(id));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFollow = (action) => {
        if (action === "unfollow") {
            dispatch(unFollow(selectedUserFollow?.id));
        } else {
            dispatch(
                setFollow({
                    user_id: currentUser.id,
                    user_id_following: user.id,
                })
            );
        }
    };

    const imgBgRef = useRef();

    const [modalEditProfile, setModalEditProfile] = useState(false);
    const [nameEdit, setNameEdit] = useState(currentUser?.user_name);
    const [bgImageUrl, setBgImageUrl] = useState(currentUser?.background_url);
    const [avatarEditUrl, setAvatarEditUrl] = useState(currentUser?.user_img);

    const openModalEditProfile = () => {
        setModalEditProfile(true);
        setNameEdit(currentUser?.user_name);
        setBgImageUrl(currentUser?.background_url);
        setAvatarEditUrl(currentUser?.user_img);
    };

    const closeModalEditProfile = () => {
        setModalEditProfile(false);
        setNameEdit(currentUser?.user_name);
        setBgImageUrl(currentUser?.background_url);
        setAvatarEditUrl(currentUser?.user_img);
    };

    const handleChangeProfile = (e) => {
        const validImageTypes = [
            "image/gif",
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (e.target.type !== "file") {
            setNameEdit(e.target.value);
        } else {
            if (validImageTypes.includes(e.target.files[0].type)) {
                const imgInput = e.target;
                const file = imgInput.files[0];

                if (file) {
                    const reader = new FileReader();

                    reader.addEventListener("load", () => {
                        if (e.target.id === "img-bg-user") {
                            setBgImageUrl(reader.result);
                        } else {
                            setAvatarEditUrl(reader.result);
                        }
                    });

                    reader.readAsDataURL(file);
                }
            } else {
                alert("You need to choose the image file!");
            }
        }
    };

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getFollows());
        dispatch(getPosts());

        window.scrollTo(0, 0);

        if (!currentUser) {
            navigate("/login");
        }
    }, [
        modalEditProfile,
        userFollowings.length,
        userFollowers.length,
        followings.length,
        currentUser?.user_name,
        currentUser?.background_url,
        currentUser?.user_img,
        nameEdit,
    ]);

    const handleSubmit = (e) => {
        if (nameEdit) {
            localStorage.setItem(
                "currentUser",
                JSON.stringify({
                    ...currentUser,
                    user_name: nameEdit,
                    background_url: bgImageUrl,
                    user_img: avatarEditUrl,
                })
            );
            dispatch(
                editUser({
                    id: currentUser?.id,
                    value: {
                        ...currentUser,
                        user_name: nameEdit,
                        background_url: bgImageUrl,
                        user_img: avatarEditUrl,
                    },
                })
            );
            setModalEditProfile(false);
        } else {
            alert("You need to write your user name");
        }
    };

    return (
        <div className="profile">
            <p className="profile-name-navbar">{user?.user_name}</p>
            <div className="profile-container">
                <div
                    className="profile-background-image"
                    style={{ backgroundImage: `url(${user?.background_url})` }}
                >
                    <span>
                        <Img
                            url={user?.user_img}
                            className="profile-avatar-img"
                        />
                    </span>
                </div>
                <div className="profile-edit">
                    <div className="btn-edit-profile">
                        {currentUser?.id === Number(id) ? (
                            <>
                                <button
                                    className="btn-edit-profile-btn"
                                    onClick={openModalEditProfile}
                                >
                                    Edit profile
                                </button>
                                <Modal
                                    isOpen={modalEditProfile}
                                    style={{
                                        content: {
                                            top: "50%",
                                            left: "50%",
                                            right: "auto",
                                            bottom: "auto",
                                            marginRight: "-50%",
                                            transform: "translate(-50%, -50%)",
                                        },
                                        overlay: {
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.5)",
                                        },
                                    }}
                                    ariaHideApp={false}
                                    onRequestClose={closeModalEditProfile}
                                    contentLabel="Example Modal"
                                >
                                    <div className="edit-modal">
                                        <div className="edit-profile">
                                            <button
                                                className="edit-profile-btn-close"
                                                onClick={closeModalEditProfile}
                                            >
                                                <Close color="#000" />
                                            </button>
                                            <div className="edit-profile-save">
                                                <p>Edit Profile</p>
                                                <button
                                                    className="edit-profile-save-btn"
                                                    onClick={(e) =>
                                                        handleSubmit(e)
                                                    }
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className="edit-modal-bg"
                                            ref={imgBgRef}
                                            style={{
                                                backgroundImage: `url(${bgImageUrl})`,
                                            }}
                                        >
                                            <input
                                                type="file"
                                                className="img-icon"
                                                id="img-bg-user"
                                                onChange={handleChangeProfile}
                                            />
                                            <label
                                                htmlFor="img-bg-user"
                                                className="edit-modal-bg-btn"
                                            >
                                                <Picture color="#fff" />
                                            </label>
                                            <span>
                                                <img
                                                    src={
                                                        avatarEditUrl ||
                                                        userError
                                                    }
                                                    alt=""
                                                    className="current-user-edit-avatar-img"
                                                />
                                                <input
                                                    type="file"
                                                    className="img-icon"
                                                    id="img-edit-avatar"
                                                    onChange={
                                                        handleChangeProfile
                                                    }
                                                />
                                                <label
                                                    htmlFor="img-edit-avatar"
                                                    className="edit-modal-bg-btn"
                                                >
                                                    <Picture color="#fff" />
                                                </label>
                                            </span>
                                        </div>
                                        <div className="edit-modal-username">
                                            <label
                                                htmlFor=""
                                                className="edit-modal-username-name"
                                            >
                                                Name
                                            </label>
                                            <br />
                                            <input
                                                type="text"
                                                className="edit-modal-username-input"
                                                onChange={handleChangeProfile}
                                                value={nameEdit}
                                            />
                                        </div>
                                    </div>
                                </Modal>
                            </>
                        ) : selectedUserFollow?.user_id === currentUser?.id &&
                          selectedUserFollow?.user_id_following ===
                              Number(id) ? (
                            <button
                                className="unfollow-btn"
                                onClick={() => handleFollow("unfollow")}
                            >
                                Unfollow
                            </button>
                        ) : (
                            <button
                                className="follow-btn"
                                onClick={() => handleFollow("follow")}
                            >
                                Follow
                            </button>
                        )}
                    </div>
                    <div className="profile-info">
                        <p className="profile-info-username">
                            {user?.user_name}
                        </p>
                        <p className="profile-info-nickname">
                            @{user?.nick_name}
                        </p>
                        <div className="profile-info-created">
                            <div className="profile-info-created-icon">
                                <Calendar color="#536471" />
                            </div>
                            {formatDate(user?.date_register)}
                        </div>
                        <div className="profile-info-follow">
                            <div>
                                <span>{userFollowings.length}</span>
                                <p>Following</p>
                            </div>
                            <div>
                                <span>{userFollowers.length}</span>
                                <p>Followers</p>
                            </div>
                        </div>
                    </div>
                </div>
                {userPosts
                    .sort((a, b) => b.time - a.time)
                    .map((userPost, index) => (
                        <Post post={userPost} key={index} />
                    ))}
            </div>
        </div>
    );
};

export default Profile;

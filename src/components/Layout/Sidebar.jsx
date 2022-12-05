import React, { memo, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    ExploreBold,
    HomeBold,
    ProfileBold,
} from "../../assets/icons/BoldIcon";
import {
    Close,
    Explore,
    Home,
    More,
    Profile,
    Tweet,
    Twitter,
} from "../../assets/icons/Icon";
import "../../sass/sidebar.scss";
import Modal from "react-modal";
import Img from "../Img/Img";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUsers, signOut } from "../../redux/thunk";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import UploadStatus from "../Upload/UploadStatus";
import UploadStatusSidebar from "../Upload/UploadStatusSideBar";

const Sidebar = () => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = useSelector((state) => state.users);

    currentUser = users.find((user) => user.email === currentUser?.email);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const navigate = useNavigate();

    const [modalUploadStatus, setModalUploadStatus] = useState(false);

    const handleUploadStatus = () => {
        setModalUploadStatus(true);
    };

    const closeModalUploadStatus = () => {
        setModalUploadStatus(false);
    };

    const handleSignOut = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    const handleSignIn = () => {
        navigate("/login");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="sidebar-page">
                    <Link to="/" className="link">
                        <Twitter
                            className="sidebar-icon"
                            width={24}
                            height={24}
                            color={"var(--primary-color)"}
                        />
                    </Link>
                </div>
                <div className="sidebar-page">
                    <NavLink to="/" className="link">
                        {({ isActive }) =>
                            isActive ? (
                                <>
                                    <HomeBold
                                        className="sidebar-icon"
                                        width={24}
                                        height={24}
                                    />
                                    <p>Home</p>
                                </>
                            ) : (
                                <>
                                    <Home
                                        className="sidebar-icon"
                                        width={24}
                                        height={24}
                                    />
                                    <p>Home</p>
                                </>
                            )
                        }
                    </NavLink>
                </div>
                <div className="sidebar-page">
                    <NavLink to="/explore" className="link">
                        {({ isActive }) =>
                            isActive ? (
                                <>
                                    <ExploreBold
                                        className="sidebar-icon"
                                        width={24}
                                        height={24}
                                    />
                                    <p>Explore</p>
                                </>
                            ) : (
                                <>
                                    <Explore
                                        className="sidebar-icon"
                                        width={24}
                                        height={24}
                                    />
                                    <p>Explore</p>
                                </>
                            )
                        }
                    </NavLink>
                </div>
                {currentUser && (
                    <div className="sidebar-page">
                        <NavLink
                            to={`/profile/${currentUser?.id}`}
                            className="link"
                        >
                            {({ isActive }) =>
                                isActive ? (
                                    <>
                                        <ProfileBold
                                            className="sidebar-icon"
                                            width={24}
                                            height={24}
                                        />
                                        <p>Profile</p>
                                    </>
                                ) : (
                                    <>
                                        <Profile
                                            className="sidebar-icon"
                                            width={24}
                                            height={24}
                                        />
                                        <p>Profile</p>
                                    </>
                                )
                            }
                        </NavLink>
                    </div>
                )}
                {currentUser?.id && (
                    <div className="sidebar-tweet">
                        <button
                            className="sidebar-tweet-btn"
                            onClick={handleUploadStatus}
                        >
                            Tweet
                        </button>
                        <button
                            className="sidebar-tweet-btn-icon"
                            onClick={handleUploadStatus}
                        >
                            <div>
                                <Tweet width={24} height={24} color="#fff" />
                            </div>
                        </button>
                        <Modal
                            isOpen={modalUploadStatus}
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
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                },
                            }}
                            ariaHideApp={false}
                            onRequestClose={closeModalUploadStatus}
                            contentLabel="Example Modal"
                        >
                            <button
                                className="sidebar-tweet-btn-upload"
                                onClick={closeModalUploadStatus}
                            >
                                <Close height={24} width={24} color="#000" />
                            </button>
                            <UploadStatusSidebar
                                closeModalUploadStatus={closeModalUploadStatus}
                            />
                        </Modal>
                    </div>
                )}
            </div>
            <div className="sidebar-wrapper">
                <div className="sidebar-page">
                    {currentUser ? (
                        <Tippy
                            theme="light"
                            trigger="click"
                            content={
                                <div onClick={handleSignOut}>
                                    <button className="btn-logout">
                                        Log out
                                        <span>@{currentUser.nick_name}</span>
                                    </button>
                                </div>
                            }
                            interactive={true}
                        >
                            <div className="signout">
                                <div className="signout-wrapper">
                                    <div className="user-info-signout">
                                        <Img
                                            className="user-info-signout-currentUser"
                                            url={currentUser.user_img}
                                        />
                                        <div>
                                            <p className="user-info-signout-name">
                                                {currentUser.user_name}
                                            </p>
                                            <p className="user-info-signout-name-nickname">
                                                @{currentUser.nick_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="user-info-signout-icon">
                                        <More width={24} height={24} />
                                    </div>
                                </div>
                            </div>
                        </Tippy>
                    ) : (
                        <button className="sign-in" onClick={handleSignIn}>
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

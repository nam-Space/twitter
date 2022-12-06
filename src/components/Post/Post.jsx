import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeartBold } from "../../assets/icons/BoldIcon";
import { Comment, Heart, More } from "../../assets/icons/Icon";
import formatDate from "../../formatDate/formatDate";
import UserComment from "../User/UserComment";
import {
    decreaseLike,
    getComments,
    getLikes,
    getUsers,
    increaseLike,
} from "../../redux/thunk";
import "../../sass/post.scss";
import Img from "../Img/Img";
import CurrentUserComment from "../User/CurrentUserComment";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = useSelector((state) => state.users);
    const likes = useSelector((state) => state.likes);
    const comments = useSelector((state) => state.comments);

    const user = users.find((user) => user.email === currentUser.email);

    const likeSelected = likes.find(
        (like) => like.user_id === user?.id && like.post_id === post?.id
    );
    const postLikes = likes.filter((like) => like.post_id === post?.id);

    const commentsPost = comments.filter(
        (comment) => comment.post_id === post?.id && comment?.ancestor_id === 0
    );

    const quantityComments = comments.filter(
        (comment) => comment.post_id === post?.id
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getLikes());
        dispatch(getComments());
    }, [users.length, likes.length, comments.length]);

    const handleLike = (e) => {
        if (!likeSelected) {
            dispatch(
                increaseLike({
                    user_id: user.id,
                    post_id: post.id,
                })
            );
        } else {
            dispatch(decreaseLike(likeSelected.id));
        }
    };

    const userCommentContainertRef = useRef();

    const handleShowComment = (e) => {
        userCommentContainertRef.current.classList.add("show");
    };

    return (
        <div className="home-post">
            <Link to={`/profile/${post?.user_id}`}>
                <Img url={post.avatar_url} className="home-post-user-avatar" />
            </Link>
            <div className="home-post-status">
                <div className="home-post-user">
                    <div className="home-post-user-info">
                        <p className="home-post-user-username">
                            <Link to={`/profile/${post?.user_id}`}>
                                {post.user_name}
                            </Link>
                        </p>

                        <p className="home-post-user-nickname">
                            <Link to={`/profile/${post?.user_id}`}>
                                @{post.nick_name}
                            </Link>
                        </p>
                        <p className="home-post-user-dot">.</p>
                        <p>{formatDate(post.time)}</p>
                    </div>
                    <div className="home-post-user-more-icon">
                        <More color="#536471" />
                    </div>
                </div>
                <p className="home-post-user-content">{post.title}</p>
                {post.img_url && (
                    <img className="img-post" src={post.img_url} alt="image" />
                )}
                {postLikes.length > 0 || quantityComments.length > 0 ? (
                    <div className="home-post-render-interact">
                        {postLikes.length ? (
                            <p className="home-post-render-likes">
                                {postLikes.length} likes
                            </p>
                        ) : null}
                        {quantityComments.length ? (
                            <p className="home-post-render-comment">
                                {quantityComments.length} comments
                            </p>
                        ) : null}
                    </div>
                ) : null}
                <div className="home-post-action">
                    <div className="home-post-like" onClick={handleLike}>
                        <div className="home-post-like-icon">
                            {likeSelected ? (
                                <HeartBold color="var(--like-color)" />
                            ) : (
                                <Heart />
                            )}
                        </div>
                        <p className={likeSelected ? "like-text" : ""}>Like</p>
                    </div>
                    <div
                        className="home-post-comment"
                        onClick={handleShowComment}
                    >
                        <div className="home-post-comment-icon">
                            <Comment />
                        </div>
                        <p>Comment</p>
                    </div>
                </div>
                <div
                    ref={userCommentContainertRef}
                    className="home-post-comment-for-user"
                >
                    {commentsPost.map((comment, index) => (
                        <UserComment
                            key={index}
                            post={post}
                            users={users}
                            comment={comment}
                            comments={comments}
                            user={user}
                        />
                    ))}

                    <CurrentUserComment
                        post={post}
                        user={user}
                        users={users}
                        action="comment"
                    />
                </div>
            </div>
        </div>
    );
};

export default Post;

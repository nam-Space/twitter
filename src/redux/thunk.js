import axios from "axios";
import {
    SET_USERS,
    GET_USERS,
    UPLOAD_POST,
    GET_POSTS,
    LIKE,
    GET_LIKES,
    SET_COMMENTS,
    GET_COMMENTS,
    SET_FOLLOW,
    UN_FOLLOW,
    GET_FOLLOWS,
    EDIT_USER,
} from "./action";

export const editUser = ({ id, value }) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(
                `http://localhost:3001/users/${id}`,
                value
            );
            dispatch({
                type: EDIT_USER,
                payload: { id, value },
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const setUsers = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(
                `http://localhost:3001/users`,
                payload
            );
            dispatch({
                type: SET_USERS,
                payload,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getUsers = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`http://localhost:3001/users`);
            dispatch({
                type: GET_USERS,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const uploadPost = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(
                `http://localhost:3001/posts`,
                payload
            );
            dispatch({
                type: UPLOAD_POST,
                payload,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getPosts = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`http://localhost:3001/posts`);
            dispatch({
                type: GET_POSTS,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getLikes = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`http://localhost:3001/likes`);
            dispatch({
                type: GET_LIKES,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const increaseLike = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(
                `http://localhost:3001/likes`,
                payload
            );
            dispatch({
                type: LIKE,
                payload,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const decreaseLike = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`http://localhost:3001/likes/${id}`);
            dispatch({
                type: LIKE,
                payload: id,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const setComments = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(
                `http://localhost:3001/comments`,
                payload
            );
            dispatch({
                type: SET_COMMENTS,
                payload,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getComments = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`http://localhost:3001/comments`);
            dispatch({
                type: GET_COMMENTS,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getFollows = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`http://localhost:3001/followings`);
            dispatch({
                type: GET_FOLLOWS,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const setFollow = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(
                `http://localhost:3001/followings`,
                payload
            );

            dispatch({
                type: SET_FOLLOW,
                payload,
            });
        } catch (error) {
            console.log(error);
            alert("Bạn bấm quá nhanh! Vui lòng reload lại trang rồi thử lại");
        }
    };
};

export const unFollow = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(
                `http://localhost:3001/followings/${id}`
            );

            dispatch({
                type: UN_FOLLOW,
                payload: id,
            });
        } catch (error) {
            console.log(error);
            alert("Bạn bấm quá nhanh! Vui lòng reload lại trang rồi thử lại");
        }
    };
};

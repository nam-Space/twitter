import {
    EDIT_USER,
    GET_COMMENTS,
    GET_FOLLOWS,
    GET_LIKES,
    GET_POSTS,
    GET_USERS,
    LIKE,
    SET_COMMENTS,
    SET_FOLLOW,
    SET_USERS,
    UNLIKE,
    UN_FOLLOW,
    UPLOAD_POST,
} from "./action";

const initialState = {
    currentUser: {},
    users: [],
    posts: [],
    followings: [],
    likes: [],
    comments: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_USER:
            const currentUserIndex = state.users.findIndex(
                (user) => user.id === action.payload.id
            );
            state.users[currentUserIndex] = action.payload.value;
            return state;

        case SET_USERS:
            return {
                ...state,
                users: [...state.users, action.payload],
            };

        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            };

        case UPLOAD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };

        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
            };

        case GET_LIKES:
            return {
                ...state,
                likes: action.payload,
            };

        case LIKE:
            return {
                ...state,
                likes: [...state.likes, action.payload],
            };

        case UNLIKE:
            const filterLike = state.likes.filter(
                (like) => like.id !== action.payload
            );
            return {
                ...state,
                likes: filterLike,
            };

        case SET_COMMENTS:
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };

        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
            };

        case GET_FOLLOWS:
            return {
                ...state,
                followings: action.payload,
            };

        case SET_FOLLOW:
            const followingResult = {
                user_id: action.payload.user_id,
                user_id_following: action.payload.user_id_following,
            };

            return {
                ...state,
                followings: [...state.followings, followingResult],
            };

        case UN_FOLLOW:
            const filterFollowings = state.followings.filter(
                (follow) => follow.id !== action.payload
            );

            return {
                ...state,
                followings: filterFollowings,
            };

        default:
            return state;
    }
};

export default rootReducer;

import { createStore } from "redux";

const INITIAL_STATE = {
    data: "home",
};

function categories(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "ADD_CATEGORY":
            return { ...state, data: action.name };
        case "ADD_ID":
            return { ...state, data: action.id };
        case "EDIT_ID":
            return { ...state, data: action.editID};
        case "COMMENT_ID":
            return { ...state, data: action.commentID};
        case "EDIT_COMMENT_ID":
            return { ...state, data: action.editCommentID};
        default:
            return state;
    }
}
const store = createStore(categories);

export default store;

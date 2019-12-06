import { SET_ALERT,REMOVE_ALERT,LOGIN_USER_FAIL, SEARCH_STUDENT_FAIL, GET_STUDENT_FAIL, GET_STUDENT_WITH_BRANCH_FAIL } from "./../actions/types";

export default function (state = [], action) {
  const { payload, type } = action;

  switch (type) {
    case SET_ALERT:
      return [payload, ...state];

    case REMOVE_ALERT:
      return state.filter(toast => toast.id !== payload);
    
    default:
      return state;
  }
}
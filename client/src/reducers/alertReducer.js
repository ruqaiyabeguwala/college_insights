import { SET_ALERT,REMOVE_ALERT } from "../constants";

export default function toasts(state = [], action) {
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
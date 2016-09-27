import assign from 'lodash.assign';
import { REHYDRATE } from 'redux-persist/constants';

import { SET_PANE, SUBSCRIBE, TEARDOWN } from './action-names';

export default function reducer(state = {}, action) {
  console.log(action)
  if (action.type === REHYDRATE) {
    // return action.payload;
  } if (action.type === SET_PANE) {
    return assign({}, state, { pane: action.pane });
  } else if (action.type === SUBSCRIBE) {
    if (state.subscribed) {
      throw new Error('Cannot subscribe when already subscribed');
    }
    return assign({}, state, { subscribed: true });
  } else if (action.type === TEARDOWN) {
    if (!state.subscribed) {
      throw new Error('Cannot teardown when not subscribed');
    }
    return assign({}, state, { subscribed: false });
  }
  return state;
}

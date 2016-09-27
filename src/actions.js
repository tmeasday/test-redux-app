import { SET_PANE, SUBSCRIBE, TEARDOWN } from './action-names';

function setPane(pane) {
  return {
    type: SET_PANE,
    pane,
  };
}

function subscribe() {
  return (dispatch) => {
    console.log('running subscribe thunk')
    dispatch({
      type: SUBSCRIBE,
    });
  };
}

function teardown() {
  return (dispatch) => {
    dispatch({
      type: TEARDOWN,
    });
  };
}

export { setPane, subscribe, teardown };

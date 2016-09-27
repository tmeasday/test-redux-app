import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { REHYDRATE } from 'redux-persist/constants';
import createActionBuffer from 'redux-action-buffer'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

import reducer from './reducers';
import { setPane, subscribe, teardown } from './actions';

import './App.css';

const store = createStore(
  reducer,
  {},
  composeWithDevTools(
    autoRehydrate(),
    applyMiddleware(
      thunk,
      createActionBuffer(REHYDRATE) //make sure to apply this after redux-thunk et al.
    ),
  )({ realtime: true }));

// console.log(autoRehydrate())

persistStore(store, {}, () => console.log('rehydrated'));

// for debugging
window.store = store;

class Left extends Component {
  componentDidMount() {
    this.props.subscribe();
  }
  componentWillUnmount() {
    this.props.teardown();
  }
  render() {
    return <div>Left HERE</div>;
  }
}

const ConnectedLeft = connect(
  () => ({}),
  (dispatch) => ({
    subscribe: () => dispatch(subscribe()),
    teardown: () => dispatch(teardown()),
  })
)(Left);

function Right() {
  return <div>Right HERE</div>;
}

class Selector extends Component {
  render() {
    const { pane, onChangePane } = this.props;
    return (
      <div>
        <button onClick={() => onChangePane('left')}>Left</button>
        <button onClick={() => onChangePane('right')}>Right</button>
        {pane === 'left' ? <ConnectedLeft/> : <Right/>}
      </div>
    )
  }
}
const ConnectedSelector = connect(
  (state) => ({ pane: state.pane || 'left' }),
  (dispatch) => ({
    onChangePane(pane) {
      return dispatch(setPane(pane));
    },
  })
)(Selector);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedSelector />
      </Provider>
    );
  }
}

export default App;

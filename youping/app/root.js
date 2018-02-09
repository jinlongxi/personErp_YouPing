import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/index';
import AppContainer from './containers/appContainer';
import * as WeChat from 'react-native-wechat';
import rootSaga from './sagas/index';

const store = configureStore();
// run root saga
store.runSaga(rootSaga);
WeChat.registerApp('wx5843eeb488708c80');

const App = () => (
    <Provider store={store}>
        <AppContainer/>
    </Provider>
);

export default App;

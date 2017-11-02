/**
 * Created by jinlongxi on 17/10/24.
 */
// import React, { Component } from 'react';
// import { Provider } from 'react-redux';
// import configureStore from './store/index';
// import App from './components/App';
//
//
//
// const store = configureStore();
//
// const Root = () => (
//     <Provider store={store}>
//         <App/>
//     </Provider>
// );
//
// export default Root;

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/index';
import AppEntry from './containers/App';



export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            store: configureStore(()=> {
                this.setState({isLoading: false})
            })
        }
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <AppEntry/>
            </Provider>
        )
    }
}

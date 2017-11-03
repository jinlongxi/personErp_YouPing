
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/index';
import AppEntry from './containers/App';
import DeviceStorage from './utils/deviceStorage';


export default class App extends Component {
    constructor(props) {
        super(props);
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

    componentWillMount() {

    }
}

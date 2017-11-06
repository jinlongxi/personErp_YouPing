import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/index';
import AppContainer from './containers/appContainer';
import DeciveStorage from './utils/deviceStorage';
import DeviceInfo from 'react-native-device-info';
import * as WeChat from 'react-native-wechat';

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
                <AppContainer/>
            </Provider>
        )
    }

    componentWillMount() {
        //用于测试  不用的时候注释掉
        WeChat.registerApp('wx5843eeb488708c80');
        WeChat.isWXAppInstalled().then((isInstalled) => {
            if (!isInstalled) {
                DeciveStorage.save('tarjeta', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwZSIsImRlbGVnYXRvck5hbWUiOiJkZWZhdWx0IiwiZXhwIjoxNTExMjYwNDY2LCJ1c2VyIjoiMTAwMzEiLCJpYXQiOjE1MDk5NjQ0NjZ9.iHEi_KXgNezyfZQtk9YH8MdARGImFaxouRHIcmYtD7U');
            }
        })
    }
}

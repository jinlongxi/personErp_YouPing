/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import LoginContainer from '../containers/LoginContainer';
import TabsContainer from '../containers/TabsContainer'
import {connect} from 'react-redux';
import * as WeChat from 'react-native-wechat';
import DeviceStorage from '../utils/deviceStorage';
import {updateToken} from '../actions/login'
import { bindActionCreators } from 'redux';
import * as readCreators from '../actions/resource';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

// const App = ({loginState, dispatch})=> {
//     return (
//         loginState.isLoggedIn ? <TabsContainer/>:<LoginContainer/>
//     )
// };
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoggedIn:false
        }
    }
    render(){
        console.log(this.state.isLoggedIn);
        return (
            this.state.isLoggedIn ? <TabsContainer/>:<LoginContainer/>
        )
    }

    componentWillMount() {
        this.props.updateToken();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoggedIn:nextProps.loginState.isLoggedIn
        })
    }
}

const mapStateToProps = (state) => {
    WeChat.registerApp('wx5843eeb488708c80');
    return {
        loginState: state.loginStore
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateToken:()=>{
            //判断是否存在TOKEN
            DeviceStorage.get('tarjeta').then((tags) => {
                if (tags) {
                    console.log(tags + '本地有TOKEN');
                    dispatch(updateToken(tags))
                } else {
                    console.log(tags + '本地没有TOKEN');
                }
            });
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

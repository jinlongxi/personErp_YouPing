/**
 * Created by jinlongxi on 17/8/22.
 */
import React, {Component} from 'react';
import Navigator from 'react-native-deprecated-custom-components'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class youping extends Component {
    render() {
        //创建ROOT对象   约定格式
        var rootRoute = {
            component:this.props.component,   //显示的组件是外部传入的
            passProps: {}                       //用于传值
        };
        return (
            <Navigator.Navigator
                initialRoute={rootRoute}
                configureScene={() => {
                    return Navigator.Navigator.SceneConfigs.SwipeFromLeft;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator} />
                }} />
        )
    }
}

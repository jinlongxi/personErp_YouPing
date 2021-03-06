/**
 * Created by jinlongxi on 17/8/22.
 */
import React, {Component} from 'react';
import Icon from './left_icon'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    Platform
} from 'react-native';

class Header extends Component {
    render() {
        let headContent = this.props.initObj;
        return (
            <View style={styles.header}>
                <View style={styles.title_container}>
                    {
                        this.props.initObj.backName !== '' ?
                            <TouchableOpacity style={styles.left_btn} onPress={this._pop.bind(this)}>
                                <Icon/>
                                <Text style={styles.btn_text}>{headContent.backName}</Text>
                            </TouchableOpacity> : null
                    }
                    <Text style={styles.title} numberOfLines={1}>{headContent.barTitle}</Text>
                </View>
            </View>
        )
    }

    componentDidMount() {
        const {hiddenTab} = this.props.initObj;
        if (hiddenTab) {
            this.props.hideTab();
        } else {
            this.props.showTab();
        }
    }


    _pop() {

        //刷新之前的页面
        if (this.props.initObj.backType === 'message') {
            this.props.navigator.pop();
        } else if (this.props.initObj.backType === 'resource') {
            this.props.navigator.pop();
        } else if (this.props.initObj.backType === 'order') {
            this.props.navigator.pop();
        } else {
            this.props.navigator.pop();
        }

        //返回显示TAB
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        if (routers.length === 2) {
            this.props.showTab();
        }
    }
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: "#3A5FCD",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 15 : 0
    },
    left_btn: {
        flexDirection: 'row',
        position: 'absolute',
        left: 0
    },
    btn_text: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    title_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 18,
        textAlign: 'center',
        width: '60%'
    }
});

module.exports = Header;

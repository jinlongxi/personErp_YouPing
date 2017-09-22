/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

class EmptyPage extends React.Component {
    constructor(props) {
        super(props);
    }

    //定义子组件传来的参数
    handleVal(event) {
        this.setState({productCategoryId: event.target.value});
    }

    //渲染页面
    render() {
        return (
            <View style={styles.container}>
                    <Text style={styles.title}>您还没有相关数据！</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        textAlign: 'center'
    }
});

export default EmptyPage

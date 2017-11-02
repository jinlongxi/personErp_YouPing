/**
 * Created by jinlongxi on 17/10/25.
 */
/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import ReleaseResource from './releaseResource'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
class EmptyView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>您还有没资源，是否要发布新资源</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.btn} onPress={this._releaseResourse.bind(this)}>
                        <Text style={styles.text}>发布资源</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    //发布资源
    _releaseResourse() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ReleaseResource',
                component: ReleaseResource,
                params: {
                    onClick: this.props.onclick
                },
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: '#1d1d1d'
    },
    btn: {
        backgroundColor: 'yellow',
        marginTop: 10,
        padding: 10,
        borderWidth: 1
    }
});


export default EmptyView

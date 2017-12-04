/**
 * Created by jinlongxi on 17/10/25.
 */
/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import ReleaseResource from './releaseResource';
import Button from '../common/buttons';
import AutoTypingText from 'react-native-auto-typing-text';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
class EmptyView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={{height: 100}}>
                        <AutoTypingText
                            text={'您还有没资源,发布新资源?'}
                            charMovingTime={150}
                            delay={0}
                            style={{
                                fontSize: 20,
                                color: '#1d1d1d',
                                margin: 20
                            }}
                            onComplete={() => {
                                this.setState({
                                    modalVisible: true
                                })
                            }}
                        />
                    </View>
                    {
                        this.state.modalVisible ? <View>
                            <Button.PlainFab onPress={()=> {
                                this._releaseResource.bind(this)()
                            }}/>
                        </View> : null
                    }
                </View>
            </View>
        )
    }

    //发布资源
    _releaseResource() {
        this.props.hiddenTabBar();
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ReleaseResource',
                component: ReleaseResource,
                params: {
                    releaseResource: this.props.releaseResource,
                    ...this.props
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
        color: '#1d1d1d',
        marginBottom: 10
    },
    btn: {
        backgroundColor: 'yellow',
        marginTop: 10,
        padding: 10,
        borderWidth: 1
    }
});

export default EmptyView

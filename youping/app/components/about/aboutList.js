/**
 * Created by jinlongxi on 17/10/25.
 */
/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    NavigatorIOS,
    ScrollView,
    Alert,
    PixelRatio
} from 'react-native';

class aboutList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>关于我</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    btnWechat: {
        marginTop: 200,
        width: 100,
        height: 44,
        marginLeft: 5,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 3
    },
    btnTel: {
        marginTop: 200,
        width: 100,
        height: 44,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 44
    },
    icon: {
        height: 30,
        width: 30,
        marginRight: 5
    },


});

export default aboutList

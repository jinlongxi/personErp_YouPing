/**
 * Created by jinlongxi on 18/2/5.
 */
/**
 * Created by jinlongxi on 17/8/22.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    Platform
} from 'react-native';


class HeaderBar extends Component {
    render() {
        //获取对象  按钮名称   头部Title
        const headContent = this.props.initObj;
        return (
            <View style={styles.header}>
                <View style={styles.title_container}>
                    <TouchableOpacity
                        style={[styles.title_btn, {
                            backgroundColor: headContent.switchType ? '#BDBDBD' : null,
                            borderBottomLeftRadius: 5,
                            borderTopLeftRadius: 5
                        }]}
                        onPress={()=>headContent.onPress(true)}>
                        <Text style={styles.title} numberOfLines={1}>{headContent.barTitleLeft}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.title_btn, {
                            backgroundColor: headContent.switchType ? null : '#BDBDBD',
                            borderBottomRightRadius: 5,
                            borderTopRightRadius: 5
                        }]}
                        onPress={()=>headContent.onPress(false)}>
                        <Text style={styles.title} numberOfLines={1}>{headContent.barTitleRight}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: "#3A5FCD",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 15 : 0,
    },
    btn_text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    title_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 18,
    },
    title_btn: {
        borderWidth: StyleSheet.hairlineWidth,
        padding: 5,
        borderColor: '#eee',
    }
});

export default HeaderBar;

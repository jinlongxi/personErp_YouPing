/**
 * Created by jinlongxi on 17/8/22.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerBar}>
                    <Text style={styles.title}>搜索资源</Text>
                </View>
                <View style={styles.containerBar}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} {...this.props}/>
                    </View>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.search}  {...this.props}>搜索</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center'
    },
    containerBar: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center',
        height: 44,
        marginTop: 10
    },
    inputContainer: {
        flex: 1,
        marginLeft: 5,
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingLeft: 5
    },
    btn: {
        width: 55,
        height: 44,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#23beff',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    search: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 44
    },
    title:{
        fontSize:18,
        color:'#1d1d1d'
    }
});

export default Search


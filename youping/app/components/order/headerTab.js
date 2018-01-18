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
    ScrollView
} from 'react-native';

class headerTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabArray: [{id: 'ALL', text: '全部'}, {id: 'PAYMENT', text: '已收款'}, {id: 'SHIPMENT', text: '已发货'}, {
                id: 4,
                text: '已完成'
            }],
            onSelect: null
        }
    }

    //切换按钮
    _changeTab(id) {
        this.setState({
            onSelect: id
        });
        this.props.getOrderList(id)
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.tabArray.map((item)=> {
                        return (
                            <TouchableOpacity key={item.id} onPress={()=>this._changeTab(item.id)}>
                                <Text
                                    style={[styles.text, {color: this.state.onSelect === item.id ? 'red' : 'black'}]}>{item.text}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    componentDidMount() {
        console.log(this.props.orderState);
        this.setState({
            onSelect: this.props.orderState.orderStatus
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        padding: 15,
        fontSize: 16
    }
});

export default headerTab

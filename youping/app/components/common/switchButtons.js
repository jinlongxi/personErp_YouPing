/**
 * Created by jinlongxi on 18/2/7.
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
    AsyncStorage,
    ScrollView,
    Switch,
    DeviceEventEmitter
} from 'react-native';

class SwitchButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseData: [
                {id: 'ADDRESS', text: '收货地址', selected: false},
                {id: 'TEL', text: '联系方式', selected: false},
                {id: 'NUMBER', text: '购买数量', selected: false},
            ]
        }
    }

    render() {
        const {onClick}=this.props.initObj;
        return (
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: '#ddd'
            }}>
                {
                    this.state.chooseData.map((item, index)=> {
                        return (
                            <TouchableOpacity key={item.id} style={[{
                                borderWidth: StyleSheet.hairlineWidth,
                                borderColor: '#ddd',
                                padding: 10,
                                margin: 10
                            },
                                {backgroundColor: item.selected ? '#8968CD' : '#F2F2F2'}]}
                                              onPress={()=> {
                                                  this.state.chooseData[index].selected = !this.state.chooseData[index].selected;
                                                  this.setState({
                                                      chooseData: this.state.chooseData
                                                  });
                                                  onClick(this.state.chooseData)
                                              }}
                            >
                                <Text>{item.text}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )

    }
}

export default SwitchButtons

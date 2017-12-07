/**
 * Created by jinlongxi on 17/11/27.
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    SinglePickerMaterialDialog,
} from 'react-native-material-dialog';
import {
    AlertIOS,
    TextInput,
    Alert
} from 'react-native'
const SHORT_LIST = ['潜在客户', '实际客户'];
class ButtonMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singlePickerVisible: false,
            singlePickerSelectedItem: '',
        };
        this._pushAlert = this._pushAlert.bind(this);
        this._salesDiscontinuation = this._salesDiscontinuation.bind(this);
    }

    render() {
        console.log(this.props);
        return (
            <View style={{flex: 1,}}>
                {/* Rest of the app comes ABOVE the action button component !*/}
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="下架" onPress={()=> {
                        this._salesDiscontinuation()
                    }}
                    >
                        <Icon name="logo-usd" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="推送消息" onPress={() => {
                        this.setState({
                            singlePickerVisible: true
                        })
                    }}>
                        <Icon name="logo-foursquare" style={styles.actionButtonIcon}/>
                    </ActionButton.Item>
                </ActionButton>
                <SinglePickerMaterialDialog
                    title={'请选择推送客户类型!'}
                    items={SHORT_LIST.map((row, index) => ({value: index, label: row}))}
                    visible={this.state.singlePickerVisible}
                    onCancel={() => this.setState({singlePickerVisible: false})}
                    onOk={(result) => {
                        this.setState({
                            singlePickerVisible: false,
                            singlePickerSelectedItem: result.selectedItem.label
                        });
                        const that = this;
                        setTimeout(function () {
                            that._pushAlert();
                        }, 500)
                    }}
                />
            </View>
        );
    }

    //下架商品
    _salesDiscontinuation() {
        const that = this;
        AlertIOS.alert('提示', '是否下架商品', [
            {
                text: '取消',
                onPress: function () {
                    console.log('取消按钮点击');
                }
            },
            {
                text: '确认',
                onPress: function () {
                    that.props.salesDiscontinuation(that.props.selectResource.productId)
                }
            },
        ])
    }

    //弹出输入对话框
    _pushAlert() {
        const that = this;
        AlertIOS.prompt('提示', '请出输入推送内容...', [
            {
                text: '取消',
                onPress: function () {
                    console.log('取消按钮点击');
                }
            },
            {
                text: '确认',
                onPress: function (text) {
                    console.log(that.state.singlePickerSelectedItem);
                    const roleTypeId = that.state.singlePickerSelectedItem === '潜在客户' ? 'PLACING_CUSTOMER' : 'CUSTOMER';
                    that.props.spreadProduct(that.props.selectResource.productId, text, roleTypeId)
                }
            },
        ])
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default ButtonMenu;

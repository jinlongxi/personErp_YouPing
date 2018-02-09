/**
 * Created by jinlongxi on 18/1/24.
 */
/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component} from 'react';
import Modal from 'react-native-modal';
import SelectInput from 'react-native-select-input-ios';
import Request from '../../utils/request';
import ServiceURl from '../../utils/service';
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
    ListView,
    DeviceEventEmitter
} from 'react-native';

class ResourceAddFeature extends React.Component {
    constructor(props) {
        super(props);
        this.data = [
            {value: ''},
            {value: ''},
            {value: ''},
        ];
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isVisible: this.props.isVisible,
            dataSource: ds.cloneWithRows(this.data),
            optionTitle: null,
            productFeatureTypeId: null,
            valueSmall: 0,
            selectData: [{value: 0, label: '可选择', productFeatureTypeId: null}]
        };
        this._addOption = this._addOption.bind(this);
        this._determine = this._determine.bind(this);
        this._addContent = this._addContent.bind(this);
        this._renderRow = this._renderRow.bind(this);
    }

    render() {
        const {featuresListData}=this.props.resourceReleaseStore;
        return (
            <View>
                <Modal style={{backgroundColor: 'white', marginVertical: 100, borderRadius: 5, padding: 10, flex: 1}}
                       isVisible={this.state.isVisible}>
                    <View style={{flex: 1}}>
                        <View style={[styles.productDescContainer, {flexDirection: 'row'}]}>
                            <TextInput
                                placeholder='请输入选项名称'
                                style={styles.productDesc_input}
                                multiline={true}
                                value={this.state.optionTitle}
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({
                                        optionTitle: text,
                                        productFeatureTypeId: this.state.optionTitle !== text ? null : this.state.productFeatureTypeId,
                                        valueSmall: 0
                                    }
                                )}
                                returnKeyType="done"
                                clearButtonMode="always"
                                keyboardAppearance="dark"
                                blurOnSubmit={true}
                                keyboardShouldPersistTaps={true}
                            />
                            <SelectInput
                                value={this.state.valueSmall}
                                options={featuresListData}
                                onCancelEditing={() => console.log('onCancel')}
                                onSubmitEditing={this.onSubmitEditingSmall.bind(this)}
                                style={styles.selectInput}
                                submitKeyText='确定'
                                cancelKeyText="取消"
                                //labelStyle={styles.selectInputInner}
                            />
                        </View>

                        <ScrollView style={{flex: 1}}>
                            <ListView
                                dataSource={this.state.dataSource}
                                initialListSize={10}    //设置显示条数
                                renderRow={this._renderRow}
                                renderSeparator={this._renderSeparator}
                                contentContainerStyle={styles.listStyle}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                keyboardShouldPersistTaps='always'
                            />
                            <TouchableOpacity onPress={()=> {
                                this._addOption(this.data)
                            }}
                                              style={styles.btnContainer}>
                                <Text style={styles.next_btn}>添加选项</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> {
                                this._determine()
                            }}
                                              style={styles.btnContainer}>
                                <Text style={styles.next_btn}>确定</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> {
                                this._hiddenModel.bind(this)()
                            }}
                                              style={styles.btnContainer}>
                                <Text style={styles.next_btn}>取消</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                </Modal>
            </View>
        )
    }

    //渲染
    _renderRow(item, sectionID, rowID, highlightRow) {
        const num = parseInt(rowID) + 1;
        return (
            <View>
                <TextInput
                    placeholder={'选项' + num}
                    style={styles.productDesc_input}
                    underlineColorAndroid='transparent'
                    returnKeyType="done"
                    clearButtonMode="always"
                    keyboardAppearance="dark"
                    onChangeText={(text)=> {
                        this._addContent(text, rowID)
                    }}
                />
            </View>
        )
    }

    //添加选项内容
    _addContent(text, rowID) {
        this.data[rowID].value = text
    }

    //渲染分割线
    _renderSeparator(sectionID, rowID) {
        var style = {
            borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth
        };
        return <View style={style} key={sectionID + rowID}/>
    }

    //添加选项
    _addOption(data) {
        console.log(data);
        this.data.push({value: ''});
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(data),
        })
    }

    //隐藏窗口
    _hiddenModel() {
        const {resourceReleaseActions}=this.props;
        resourceReleaseActions.showFeaturesModel(false)
    }

    //确定添加
    _determine() {
        const option = [];
        const dataList = [];
        this.data.map((item)=> {
            if (item.value !== '') {
                dataList.push(item)
            }
        });
        if (this.state.optionTitle == null) {
            alert('选项标题不能为空')
        } else if (dataList.length < 1) {
            alert('至少有一个选项')
        } else {
            //判断输入框内的数据是否存在于下拉选择框中，如果存在设置productFeatureTypeId
            let productFeatureTypeId = this.state.productFeatureTypeId;
            if (this.state.productFeatureTypeId == null) {
                this.state.selectData.map((item)=> {
                    if (item.label === this.state.optionTitle) {
                        console.log('查到了有在下拉' + item.productFeatureTypeId);
                        productFeatureTypeId = item.productFeatureTypeId
                    }
                });
            }

            option.push({
                optionTitle: this.state.optionTitle,
                optionList: dataList,
                productFeatureTypeId: productFeatureTypeId == null ? '' : productFeatureTypeId
            });
            this._hiddenModel();
            DeviceEventEmitter.emit('Msg', option);
            this.data = [
                {value: ''},
                {value: ''},
                {value: ''},
            ];
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                dataSource: ds.cloneWithRows(this.data),
                optionTitle: null,
                productFeatureTypeId: null,
                valueSmall: 0,
            })
        }
    }

    onSubmitEditingSmall(value) {
        if (value !== 0) {
            this.setState({
                valueSmall: value,
                optionTitle: this.state.selectData[value].label,
                productFeatureTypeId: this.state.selectData[value].productFeatureTypeId
            });
        }
    }

    getPickerOptions() {
        const that = this;
        const data = this.state.selectData;
        let url = ServiceURl.personManager + 'queryUserProductFeaturePreference';
        Request.postRequest(url, '', function (response) {
            console.log('查询客户已有的特征列表' + JSON.stringify(response));
            const {featureTypeList:featureTypeList}=response;
            featureTypeList.map((item, index)=> {
                data.push({value: index + 1, label: item.description, productFeatureTypeId: item.productFeatureTypeId})
            });
            that.setState({
                selectData: data
            });
        }, function (err) {
            console.log(JSON.stringify(err))
        });
    }

    componentDidMount() {
        //this.getPickerOptions()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isVisible: nextProps.isVisible
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    //产品名称
    productNameContainer: {
        marginVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0'
    },
    productName_text: {
        fontSize: 18,
        color: '#4a4a4a',
        padding: 5,
    },
    productName_input: {
        fontSize: 16,
        padding: 5,
        color: '#4a4a4a',
    },
    //产品描述
    productDesc_text: {
        fontSize: 18,
        color: '#4a4a4a',
        padding: 5
    },
    productDesc_input: {
        fontSize: 18,
        padding: 10,
        color: '#4a4a4a',
        borderColor: '#C6E2FF',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 2,
        flex: 1
    },
    //下一步按钮
    btnContainer: {
        height: 50,
        backgroundColor: '#CD661D',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    next_btn: {
        color: '#ffffff',
        fontSize: 16
    },
    //高级选项
    radio: {
        marginVertical: 10,
        flexDirection: 'row'
    },
    radio_text: {
        fontSize: 16,
        textAlignVertical: 'center'
    },
    //添加选项
    addOptions_btn: {
        backgroundColor: '#FFC125',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    addOptions_text: {
        fontSize: 16
    },
    //选择框
    selectInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
        overflow: 'hidden',
        width: "30%",
        justifyContent: 'center'
    },
    selectInputInner: {
        height: 36,
        borderRadius: 4,
    },
});

export default ResourceAddFeature

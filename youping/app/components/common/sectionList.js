import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    SectionList,
} from 'react-native';

class SectionViewList extends Component {

    constructor(props) {
        super(props);
    }

    _renderItem = (info) => {
        var txt = '  ' + info.item.firstName;
        return <Text
            style={{
                height: 30,
                textAlignVertical: 'center',
                backgroundColor: "#ffffff",
                color: 'red',
                fontSize: 15,
                textAlign:'center',
            }}>{txt}购买过</Text>
    };

    // _sectionComp = (info) => {
    //     var txt = info.section.key;
    //     return <Text
    //         style={{
    //             height: 50,
    //             textAlign: 'center',
    //             textAlignVertical: 'center',
    //             backgroundColor: '#9CEBBC',
    //             color: 'white',
    //             fontSize: 30
    //         }}>{txt}</Text>
    // };

    render() {
        var sections = [
            {key: "交易记录", data: this.props.sectionData},
        ];
        console.log(JSON.stringify(this.props.sectionData)+'使用这个列表传来的数据');
        console.disableYellowBox = true;//取消黄色警告
        return (
            <View style={{flex: 1}}>
                <SectionList
                    renderItem={this._renderItem}
                    renderSectionHeader={this._sectionComp}
                    sections={sections}
                    ItemSeparatorComponent={() => <View><Text></Text></View>}
                />
            </View>
        );
    }

}

export default SectionViewList


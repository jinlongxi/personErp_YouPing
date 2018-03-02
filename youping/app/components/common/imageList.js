/**
 * Created by jinlongxi on 17/11/13.
 */
import React, {Component} from 'react';
import Util from '../../utils/util';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
}from 'react-native';

//获取屏幕的宽高
const {width, height} =Util.windowSize;
//全局变量
const cols = 3;
const boxW = width*0.28;
const vMargin = (width - cols * boxW) / (cols + 1);
const hMargin = 20;
class ImageList extends Component {
    render() {
        const data = this.props.data;
        return (
            <View style={styles.container}>
                {this.renderAllBadge(data)}
            </View>    );
    }

    renderAllBadge(data) {
        var allData = [];
        for (var i = 0; i < data.length; i++) {
            var badge =data[i];
            allData.push(
                //  key={i} ：for循环的创建的组件必须设置唯一标示，不然会抱警告
                <View key={i} style={styles.outViewS}>
                    <Image source={{uri:badge.drObjectInfo||badge.uri}} style={styles.imageStyle}></Image>
                </View>);
        }
        return allData;
    }
}

const styles = StyleSheet.create({
        container: {
            flexDirection: 'row', //设置主轴方向
            flexWrap: 'wrap', //超出换行
            width: width,  //宽度等于屏幕宽度
        },
        outViewS: {
            alignItems: 'center',   //交叉轴的对齐方式
            width: boxW,
            height: boxW,
            marginLeft: vMargin,
            marginTop: hMargin,
            borderWidth:StyleSheet.hairlineWidth,
            justifyContent:'center',
            padding:2,
            borderColor:'#ddd',
            borderRadius:2,
        },
        imageStyle: {
            width: '100%',
            height: '100%',
        },
        titleName: {
            backgroundColor: 'red'
        }
    }
);

export default ImageList;

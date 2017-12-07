/**
 * Created by jinlongxi on 17/12/6.
 */
import React from 'react';
import {AppRegistry, StyleSheet, ScrollView, StatusBar, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        margin: 5
    },
    //图标
    charList:{
        flexDirection:'row',
        margin:10,
    }
});

class SimpleChart extends React.Component {
    render() {
        const chart_wh = 250;
        const series = [20,12,112];
        const sliceColor = ['#F44336', '#2196F3', '#BC8F8F'];

        return (
            <ScrollView style={{flex: 1}}>
                <View style={styles.container}>
                    <StatusBar
                        hidden={false}
                    />
                    <PieChart
                        chart_wh={chart_wh}
                        series={series}
                        sliceColor={sliceColor}
                        doughnut={true}
                        coverRadius={0.45}
                        coverFill={'#FFF'}
                    />
                    <View style={styles.charList}>
                        <Text style={{color:'#F44336',paddingHorizontal:5}}>潜在客户(20)</Text>
                        <Text style={{color:'#2196F3',paddingHorizontal:5}}>实际客户(12)</Text>
                        <Text style={{color:'#BC8F8F',paddingHorizontal:5}}>浏览量(112)</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default SimpleChart

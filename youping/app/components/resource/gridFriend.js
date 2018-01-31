/**
 * Created by jinlongxi on 18/1/18.
 */
import React, {
    Component,
} from 'react'
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Animated,
} from 'react-native'

import SortableSudokuGrid from 'react-native-smart-sortable-sudoku-grid'

import image_cash from '../../img/tabs/contact.png'


const dataList = [
    {
        icon: image_cash,
        title: '客户1',
    },
    {
        icon: image_cash,
        title: '客户2',
    },
    {
        icon: image_cash,
        title: '客户3',
    },
    {
        icon: image_cash,
        title: '客户4',
    },
    {
        icon: image_cash,
        title: '客户5',
    },
    {
        icon: image_cash,
        title: '客户6',
    },
    {
        icon: image_cash,
        title: '客户7',
    },
    {
        icon: image_cash,
        title: '客户8',
    },
    {
        icon: image_cash,
        title: '客户9',
    },
];

const columnCount = 3;

export default class ThreeColumns extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            candidates: [],
            sortable: false,
            scrollEnabled: true,
            disabled: false,
            managementButtonText: 'Manage',
            opacity: new Animated.Value(0),
        };
    }

    render() {
        return (
            <ScrollView
                scrollEnabled={this.state.scrollEnabled}>
                {this.state.dataSource != null ? <SortableSudokuGrid
                    containerStyle={{backgroundColor: '#fff', height: 100}}
                    columnCount={columnCount}
                    dataSource={this.state.dataSource}
                    renderCell={this._renderGridCell}
                    sortable={this.state.sortable}
                /> : null}
            </ScrollView>
        )
    }

    _renderGridCell = (data) => {
        return (
            <TouchableOpacity
                style={{flex: 1, padding: 6, position: 'relative',}}
                onPress={ this._onPressCell.bind(this, data) }
            >
                <View style={{
                    overflow: 'hidden', backgroundColor: '#fff',
                    justifyContent: 'center', alignItems: 'center', flex: 1,
                    borderWidth: StyleSheet.hairlineWidth, borderColor: '#eee',
                }}>
                    <Image source={{uri: data.headPortrait}}
                           style={{width: 30, height: 30, marginHorizontal: 10, marginBottom: 10}}/>
                    <Text>{data.firstName}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    _onPressCell = (data) => {
        Alert.alert('点他您想要做什么，请讲述你的想法！ -> ' + data.firstName)
    };

    componentDidMount() {
        this.setState({
            dataSource: this.props.data
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: nextProps.data
        })
    }
}
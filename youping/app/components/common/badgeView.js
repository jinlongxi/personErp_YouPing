/**
 * Created by jinlongxi on 17/9/11.
 */
import React, {Component, PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

class badgeView extends React.Component {
    constructor(props) {
        super(props);
    }

    //定义相关属性类型
    static propTypes = {
        badgeStyle: View.propTypes.style,
        title: PropTypes.string.isRequired,
        padding: PropTypes.number,
        renderImage: PropTypes.func,
        badgeText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    //render外部传递的组件
    renderImage(props) {
        if (this.props.renderImage) {
            //这里将引用外部renderImage方法
            return React.cloneElement(this.props.renderImage(), props);
        } else {
            return null;
        }
    }

    render() {
        let {image, title, renderImage, padding, badgeText}=this.props;
        return (
            <View style={[{padding: 10, alignItems: 'center', justifyContent: 'center'}, this.props.badgeStyle]}>
                <View>
                    {
                        badgeText && badgeText !== 0 ?
                            <View style={styles.badgeIcon}><View style={styles.badge}><Text
                                style={styles.badgeText}>{badgeText}</Text></View></View>
                            : null
                    }
                    {this.renderImage(this.props)}
                </View>
                <Text
                    allowFontScaling={true}
                    numberOfLines={1}
                    style={{marginTop: padding, width: 80}}
                >{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    badgeIcon: {
        flex: 1,
    },
    badge: {
        marginLeft: 80,
        height: 20,
        width: 20,
        borderRadius: 40,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    }
});


export default badgeView

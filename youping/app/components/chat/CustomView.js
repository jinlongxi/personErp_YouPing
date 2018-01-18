import PropTypes from 'prop-types';
import React from 'react';
import {
    Linking,
    Platform,
    StyleSheet,
    TouchableOpacity,
    ViewPropTypes,
    View,
    Text,
} from 'react-native';
import MapView from 'react-native-maps';

export default class CustomView extends React.Component {
    render() {
        if (this.props.currentMessage.location) {
            return (
                <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={() => {
                    const url = Platform.select({
                        ios: `https://maps.apple.com/?ll=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`,
                        android: `https://maps.google.com/?q=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`
                    });
                    Linking.canOpenURL(url).then(supported => {
                        if (supported) {
                            return Linking.openURL(url);
                        }
                    }).catch(err => {
                        console.error('An error occurred', err);
                    });
                }}>
                    <MapView
                        style={[styles.mapView, this.props.mapViewStyle]}
                        initialRegion={{
                            latitude: this.props.currentMessage.location.latitude,
                            longitude: this.props.currentMessage.location.longitude,
                            latitudeDelta: 0.5,
                            longitudeDelta: 0.5,
                        }}
                        annotations={[{
                            longitude: this.props.currentMessage.location.latitude,
                            latitude: this.props.currentMessage.location.longitude,
                            title: '我的位置',
                        }]}
                        scrollEnabled={false}
                        zoomEnabled={false}

                    />
                    <Text>点击查看我的位置</Text>
                </TouchableOpacity>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {},
    mapView: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
    },
});

CustomView.defaultProps = {
    currentMessage: {},
    containerStyle: {},
    mapViewStyle: {},
};

CustomView.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    mapViewStyle: ViewPropTypes.style,
};

/**
 * Created by jinlongxi on 17/11/24.
 */
import React from 'react';
const MK = require('react-native-material-kit');

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
} from 'react-native';

const {
    MKButton,
    MKColor,
} = MK;

// // customize the material design theme
// MK.setTheme({
//   primaryColor: MKColor.Teal,
//   accentColor: MKColor.Purple,
// });
const styles = Object.assign({}, StyleSheet.create({
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    fab: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
}));
const Buttons = {
    ColoredRaisedButton: MKButton.coloredButton()
        .withText('发布')
        .build(),
    AccentColoredRaisedButton: MKButton.accentColoredButton()
        .build(),
    PlainRaisedButton: MKButton.button()
        .withText('BUTTON')
        .build(),
    AccentColoredFab: MKButton.accentColoredFab()
        .withText('发布')
        .withStyle(styles.fab)
        .build(),
    AccentColoredFlatButton: MKButton.accentColoredFlatButton()
        .withText('BUTTON')
        .build(),
    PlainFab: MKButton.plainFab()
        .withBackgroundColor(MKColor.DeepOrange)
        .withText('发布')
        .withTextStyle({
            color: 'white',
            fontWeight: 'bold',
            fontSize:16
        })
        .withStyle(styles.fab)
        .build(),
};

export default Buttons

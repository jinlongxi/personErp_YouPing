'use strict';

import {AlertIOS} from 'react-native';
import * as TYPES from '../constants/ActionTypes';

//隐藏tab_bar
export function hideTabBar(){
    return {
        type:TYPES.HIDDEN_TAB_BAR
    }
}

//显示tab_bar
export function showTabBar(){
    return {
        type:TYPES.SHOW_TAB_BAR
    }
}





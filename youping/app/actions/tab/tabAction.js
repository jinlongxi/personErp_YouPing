'use strict';
import * as TYPES from '../../constants/ActionTypes';

//切换tab_bar
export function switchTabBar(selectedTab) {
    return {
        type: TYPES.SWITCH_TAB_BAR,
        selectedTab
    }
}

//隐藏tab_bar
export function hideTabBar() {
    return {
        type: TYPES.HIDDEN_TAB_BAR
    }
}

//显示tab_bar
export function showTabBar() {
    return {
        type: TYPES.SHOW_TAB_BAR
    }
}

//请求保存registrationId
export function requestSaveRegistrationId(registrationId) {
    return {
        type: TYPES.REQUEST_SAVE_REGID,
        registrationId,
    };
}
//网络请求保存registrationId
export function fetchSaveRegistrationId() {
    return {
        type: TYPES.FETCH_SAVE_REGID,
    };
}

//保存当前设备推送的registrationId
export function saveRegistrationId(registrationId) {
    return {
        type: TYPES.SAVE_REGID_SUCCESS,
        registrationId
    }
}





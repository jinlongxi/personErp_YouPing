'use strict';

import * as TYPES from '../../constants/ActionTypes';

const initialState = {
    isHidden: false,
    selectedTab: 'Event',
    registrationId: null
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case TYPES.SWITCH_TAB_BAR:
            return {
                ...state,
                selectedTab: action.selectedTab
            };
        case TYPES.HIDDEN_TAB_BAR:
            return {
                ...state,
                isHidden: true,
            };
        case TYPES.SHOW_TAB_BAR:
            return {
                ...state,
                isHidden: false,
            };
        //保存registrationId
        case TYPES.SAVE_REGID_SUCCESS:
            return {
                ...state,
                registrationId: action.registrationId,
            };
        default:
            return state;
    }
}

'use strict';

import * as TYPES from '../constants/ActionTypes';

const initialState = {
    isHidden: false
};

export default function login(state = initialState, action) {
    switch (action.type) {
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
        default:
            return state;
    }
}

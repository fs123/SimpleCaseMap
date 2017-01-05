import * as update from 'immutability-helper';
import {CASEMAP_LOAD} from "./casemap";

/**
 * https://github.com/markerikson/redux/blob/structuring-reducers-page/docs/recipes/StructuringReducers.md
 * https://github.com/reactjs/redux/blob/master/docs/recipes/StructuringReducers.md
 */

const EDIT_PROCESS = 'EDIT_PROCESS';

export class EditActions {
    static editProcess(laneId, processId) {
        return {
            type: EDIT_PROCESS,
            payload: {
                laneId,
                processId,
            },
        }
    }
}

const initialState = {
    editType: null, // S = Stage, P = Process
    editPayload: null
};

let redusers = {
    [CASEMAP_LOAD]: () => {
        return initialState
    },
    [EDIT_PROCESS]: (state, payload) => {
        if (state.editType == "P"
            && state.editPayload.processId == payload.processId) {
            return {
                ...state,
                editType: null,
                editPayload: null
            }
        }
        const {laneId, processId} = payload;
        return {
            ...state,
            editType: "P",
            editPayload: {laneId, processId}
        }
    }
};

export default function reducer(state = initialState, action) {
    let reducer = redusers[action.type];
    if (reducer) {
        return reducer(state, action.payload);
    }
    return state
}

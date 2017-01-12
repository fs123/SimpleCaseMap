import * as update from 'immutability-helper';
import {CASEMAP_LOAD} from "./casemap";

/**
 * https://github.com/markerikson/redux/blob/structuring-reducers-page/docs/recipes/StructuringReducers.md
 * https://github.com/reactjs/redux/blob/master/docs/recipes/StructuringReducers.md
 */

const EDIT_PROCESS = 'EDIT_PROCESS';

const DND_PROCESS_STARTED = 'DND_PROCESS_STARTED';
const DND_PROCESS_ENDED = 'DND_PROCESS_ENDED';
const DND_HOVER_OVER_STAGE = 'DND_HOVER_OVER_STAGE';
const DND_HOVER_OVER_PROCESS = 'DND_HOVER_OVER_PROCESS';

export class EditActions {
    static editProcess(stageId, processId) {
        return {
            type: EDIT_PROCESS,
            payload: {
                stageId,
                processId,
            },
        }
    }


    static dndProcessStarted(processId) {
        return {
            type: DND_PROCESS_STARTED,
            payload: {
                processId
            }
        }
    }
    static dndProcessEnded() {
        return {
            type: DND_PROCESS_ENDED,
            payload: {}
        }
    }
    static dndHoverOverStage(stageId) {
        return {
            type: DND_HOVER_OVER_STAGE,
            payload: {
                stageId
            }
        }
    }
    static dndHoverOverProcess(processId, after=false) {
        return {
            type: DND_HOVER_OVER_PROCESS,
            payload: {
                processId
            }
        }
    }
}

const initialState = {
    editType: "P", // S = Stage, P = Process
    editPayload: {stageId:1, processId:1},
    dndProcessId: null,
    dndOverProcessId: null
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
        const {stageId, processId} = payload;
        return {
            ...state,
            editType: "P",
            editPayload: {stageId, processId}
        }
    },
    [DND_PROCESS_STARTED]: (state, payload) => {
        return {
            ...state,
            editType: null,
            editPayload: null,
            dndProcessId: payload.processId
        }
    },
    [DND_PROCESS_ENDED]: (state, payload) => {
        return {
            ...state,
            dndOverProcessId: null,
            dndProcessId: null
        }
    },
    [DND_HOVER_OVER_PROCESS]: (state, payload) => {
        if (state.dndOverProcessId == payload.processId) {
            return state;
        }
        return {
            ...state,
            dndOverProcessId: payload.processId
        }
    },
    [DND_HOVER_OVER_STAGE]: (state, payload) => {
        return {
            ...state,
            dndOverProcessId: null
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

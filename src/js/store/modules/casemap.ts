import * as update from 'immutability-helper';
import 'core-js/fn/array/find'

export const CASEMAP_LOAD = 'CASEMAP_LOAD';

export const STAGE_ADD = 'STAGE_ADD';
export const STATE_UPDATE = 'STATE_UPDATE';
export const STAGE_DELETE = 'STAGE_DELETE';

export const PROCESS_ADD = 'PROCESS_ADD';
export const PROCESS_UPDATE = 'PROCESS_UPDATE';
export const PROCESS_DELETE = 'PROCESS_DELETE';
export const PROCESS_MOVE = 'PROCESS_MOVE';


// https://github.com/erikras/react-redux-universal-hot-example

// Naming:
// Actions: Name them <noun>-<verb>, eg Project-Create, User-Login. The rationale behind this is that you want them grouped together by the object type, rather than the action type.
// Reducers: Name them <noun>.

let reducerActions = {};

export class CaseMapActions {
    static caseMapLoad(caseMap) {
        return {
            type: CASEMAP_LOAD,
            payload: {
                caseMap
            },
        }
    }
}

export class StageActions {
    static addStage(id, name) {
        return {
            type: STAGE_ADD,
            payload: {
                id,
                name,
            },
        }
    }

    static updateStage(id, name:string) {
        return {
            type: STATE_UPDATE,
            payload: {
                id,
                name
            },
        }
    }

    static deleteStage(id) {
        return {
            type: STAGE_DELETE,
            payload: id
        }
    }
}

export class ProcessActions {
    static addProcess(laneId, id, name) {
        return {
            type: PROCESS_ADD,
            payload: {
                laneId,
                id,
                name,
            },
        }
    }

    static updateProcess(laneId, id, name) {
        return {
            type: PROCESS_UPDATE,
            payload: {
                laneId,
                id,
                name,
            },
        }
    }

    /*
    static deleteProcess(id) {
        return {
            type: PROCESS_DELETE,
            payload: id
        }
    }
    */
    static moveProcess(
        sourceStageId: number, sourceProcessId: number,
        targedStageId: number, targetProcessId: number) {
        return {
            type: PROCESS_MOVE,
            payload: {
                sourceStageId,
                sourceProcessId,
                targedStageId,
                targetProcessId
            }
        }
    }
}

const INITIAL_STATE = {
    lanes: [
        {
            id: 1,
            name: "First Stage",
            processes: [
                {
                    id: 1,
                    name: "Process A",
                },
                {
                    id: 2,
                    name: "Process B",
                }
            ]
        },
        {
            id: 2,
            name: "Second Stage",
            processes: [
                {
                    id: 3,
                    name: "Process N",
                },
                {
                    id: 4,
                    name: "Process M",
                }
            ]
        }
    ]
};


let redusers = {
    [CASEMAP_LOAD]: (state, payload) => {
        return payload.caseMap;
    },
    [STAGE_ADD]: (state, payload) => {
        return {
            ...state,
            lanes: [...state.lanes, payload],
        }
    },
    [PROCESS_ADD]: (state, payload) => {
        const {laneId, id, name} = payload;
        const newProcess = {
            id,
            name
        };
        const laneIndex = state.lanes.map(l => l.id).indexOf(laneId);
        const operation = (!state.lanes[laneIndex].processes) ? '$set' : '$push';
        return update(state, {lanes: {[laneIndex]: {processes: {[operation]: [newProcess]}}}});
    },
    [PROCESS_UPDATE]: (state, payload) => {
        const {laneId, id, name} = payload;
        const laneIndex = state.lanes.map(l => l.id).indexOf(laneId);
        const processIndex = state.lanes[laneIndex].processes.map(l => l.id).indexOf(id);
        return update(state, {lanes: {[laneIndex]: {processes: {[processIndex]: {name: {'$set': name}}}}}});
    },
    [PROCESS_MOVE]: (state, payload) => {

        const {sourceStageId, sourceProcessId, targedStageId, targetProcessId} = payload;

        // remove process
        const removeProcessOnStageIndex = state.lanes.map(l => l.id).indexOf(sourceStageId);
        const removeProcessIndex = state.lanes[removeProcessOnStageIndex].processes.map(l => l.id).indexOf(sourceProcessId);

        const processToMove = state.lanes[removeProcessOnStageIndex].processes[removeProcessIndex];

        state = update(state, {lanes: {[removeProcessOnStageIndex]: {processes: {'$splice': [[removeProcessIndex, 1]]}}}});

        // add process
        const addProcessOnStageIndex = state.lanes.map(l => l.id).indexOf(targedStageId);
        const addProcessIndex = state.lanes[addProcessOnStageIndex].processes.map(l => l.id).indexOf(targetProcessId);
        state = update(state, {lanes: {[addProcessOnStageIndex]: {processes: {'$splice': [[addProcessIndex, 0, processToMove]]}}}});

        return state;
    }
};

export default function reducer(state = INITIAL_STATE, action) {
    let reducer = redusers[action.type];
    if (reducer) {
        return reducer(state, action.payload);
    }
    return state
}

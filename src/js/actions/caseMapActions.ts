import {Action, IStage, IProcess} from "../interfaces/interfaces"

export const ADD_LANE = "ADD_LANE";
export type ADD_LANE = { id: string, name: string }

export const UPDATE_LANE = "UPDATE_LANE";
export type UPDATE_LANE = { id: string, name: string }

export const ADD_PROCESS = "ADD_PROCESS";
export type ADD_PROCESS = { laneId: string, id: string, name: string }

export function requestLanes() {
    const lanes = [
        {
            name: "Stage A",
            processes: [
                {
                    name: "Process A 1"
                },
                {
                    name: "Process A 2"
                }
            ]
        },
        {
            name: "Stage B",
            processes: [
                {
                    name: "Process B 1"
                }
            ]
        }
    ];
    return function(dispatch) {
        setTimeout(() => {
                dispatch({type: "REQUEST_LANES_FULFILLED", payload: lanes})
            }
            , 250);
    }
}

export function addLane(id: string, name: string) : Action<ADD_LANE> {
    return {
        type: ADD_LANE,
        payload: {
            id,
            name,
        },
    }
}

export function updateLane(id: string, name: string) : Action<UPDATE_LANE> {
    return {
        type: UPDATE_LANE,
        payload: {
            id,
            name
        },
    }
}

export function toggleEditProcess(laneId: string, process: string) {
    return {
        type: 'TOGGLE_EDIT_PROCESS',
        payload: {
            laneId,
            process,
        },
    }
}

export function addProcess(laneId: string, id: string, name: string) : Action<ADD_PROCESS> {
    return {
        type: ADD_PROCESS,
        payload: {
            laneId,
            id,
            name,
        },
    }
}

export function updateProcess(laneId: string, id: string, name: string) {
    return {
        type: 'UPDATE_PROCESS',
        payload: {
            laneId,
            id,
            name,
        },
    }
}


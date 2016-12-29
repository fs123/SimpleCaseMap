
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

export function addLane(id: string, name: string) {
    return {
        type: 'ADD_LANE',
        payload: {
            id,
            name,
        },
    }
}

export function updateLane(id: string, name: string) {
    return {
        type: 'UPDATE_LANE',
        payload: {
            id,
            name
        },
    }
}

export function deleteLane(id: string) {
    return { type: 'DELETE_TWEET', payload: id}
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

export function addProcess(laneId: string, id: string, name: string) {
    return {
        type: 'ADD_PROCESS',
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

export function deleteProcess(id: string) {
    return { type: 'DELETE_PROCESS', payload: id}
}

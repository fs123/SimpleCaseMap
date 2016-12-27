
export function requestLanes() {
    const lanes = [
        {
            name: "Lane A",
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
            name: "Lane B",
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

export function addLane(id, name) {
    return {
        type: 'ADD_LANE',
        payload: {
            id,
            name,
        },
    }
}

export function updateLane(id, name) {
    return {
        type: 'UPDATE_LANE',
        payload: {
            id,
            name
        },
    }
}

export function deleteLane(id) {
    return { type: 'DELETE_TWEET', payload: id}
}


export function addProcess(laneId, id, name) {
    return {
        type: 'ADD_PROCESS',
        payload: {
            laneId,
            id,
            name,
        },
    }
}

export function updateProcess(id, name) {
    return {
        type: 'UPDATE_PROCESS',
        payload: {
            id,
            name,
        },
    }
}

export function deleteProcess(id) {
    return { type: 'DELETE_PROCESS', payload: id}
}

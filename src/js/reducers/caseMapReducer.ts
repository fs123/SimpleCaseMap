import * as update from 'immutability-helper';

/**
 * https://github.com/markerikson/redux/blob/structuring-reducers-page/docs/recipes/StructuringReducers.md
 * https://github.com/reactjs/redux/blob/master/docs/recipes/StructuringReducers.md
 */
export default function reducer(state={
    lanes: [
        {
            id: 1,
            name: "First Stage",
            processes: [
                {
                    id: 1,
                    name: "First Process",
                }
            ]
        }
    ]
}, action) {

    switch (action.type) {
        case "REQUEST_LANES_FULFILLED": {
            return {
                ...state,
                lanes: action.payload,
            }
        }
        case "ADD_LANE": {
            return {
                ...state,
                lanes: [...state.lanes, action.payload],
            }
        }
        case "ADD_PROCESS": {

            const {laneId} = action.payload;

            const newProcess = {
                id: action.payload.id,
                name: action.payload.name};

            const laneIndex = state.lanes.map(l => l.id).indexOf(laneId);
            // https://facebook.github.io/react/docs/update.html
            // https://github.com/kolodny/immutability-helper
            const operation = (!state.lanes[laneIndex].processes) ? '$set' : '$push';
            return update(state, {lanes: {[laneIndex]: {processes: {[operation]: [newProcess]}}}});
        }

        case "UPDATE_PROCESS": {
            const { laneId, id, name } = action.payload;

            const laneIndex = state.lanes.map(l => l.id).indexOf(laneId);
            const processIndex = state.lanes[laneIndex].processes.map(l => l.id).indexOf(id);
            return update(state, {lanes: {[laneIndex]: {processes: {[processIndex]: {name: {'$set': name}}}}}});
        }
/*
        case "DELETE_PROCESS": {
            return state;
        }
         */
    }

    return state
}

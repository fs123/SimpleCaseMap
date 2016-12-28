import update from 'immutability-helper';

/**
 * https://github.com/markerikson/redux/blob/structuring-reducers-page/docs/recipes/StructuringReducers.md
 * https://github.com/reactjs/redux/blob/master/docs/recipes/StructuringReducers.md
 */
export default function reducer(
    state = {
        editType: null, // S = Stage, P = Process
        editPayload: null
    },
    action) {

    switch (action.type) {
        case "TOGGLE_EDIT_PROCESS": {
            if (state.editType == "P"
             && state.editPayload.process.id == action.payload.process.id) {
                return {
                    ...state,
                    editType: null,
                    editPayload: null
                }
            }
            return {
                ...state,
                editType: "P",
                editPayload: action.payload
            }
        }
    }

    return state
}

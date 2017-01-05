import { combineReducers } from "redux"

import caseMap from "./casemap";
import caseMapUi from "./casemapui";

export default combineReducers({
    caseMap,
    caseMapUi
})

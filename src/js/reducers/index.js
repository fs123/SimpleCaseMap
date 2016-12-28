import { combineReducers } from "redux"

import caseMap from "./caseMapReducer";
import caseMapUi from "./caseMapUiReducer";

export default combineReducers({
  caseMap,
  caseMapUi
})

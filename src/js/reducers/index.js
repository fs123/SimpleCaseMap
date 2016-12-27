import { combineReducers } from "redux"

import tweets from "./tweetsReducer"
import user from "./userReducer"
import caseMap from "./caseMapReducer";

export default combineReducers({
  tweets,
  user,
  caseMap
})

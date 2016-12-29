import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"

import store from "./store"
import CaseMap from "./components/CaseMap"

const app = document.getElementById('app');

ReactDOM.render(<Provider store={store}>
  <CaseMap />
</Provider>, app);

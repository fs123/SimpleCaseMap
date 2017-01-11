import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import CaseMap from "./CaseMap";

export default DragDropContext(HTML5Backend)(CaseMap);
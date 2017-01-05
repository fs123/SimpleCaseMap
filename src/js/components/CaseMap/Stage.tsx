import * as React from "react"
import { connect } from "react-redux"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import { DropTarget } from 'react-dnd';

import {StageActions, ProcessActions, CaseMapActions} from "../../store/modules/casemap"
import {EditActions} from "../../store/modules/casemapui";
import Process from "./Process";
import {ProcessEdit} from "./ProcessEdit";
import {ItemTypes} from "./Constants";
import PropTypes = React.PropTypes;

export class Stage extends React.Component<any, any> {
    static contextTypes = {
        store: React.PropTypes.object.isRequired,
    };

    static propTypes = {

        process: PropTypes.object.isRequired,
        lane: PropTypes.object.isRequired,

        // Injected by React DnD:
        isDragging: PropTypes.bool.isRequired,
        isOver: PropTypes.bool.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
    };

    newProcess() {
        const { lane } = this.props;
        this.context.store.dispatch(ProcessActions.addProcess(lane.id, new Date().getTime(), "New Process"));
    }

    render() {
        const { lane } = this.props;
        const { caseMapUi } = this.context.store.getState();

        const processes = (!lane.processes) ? [] : lane.processes.map(process => <Process key={process.id} lane={lane} process={process} />);

        var edit = null;
        if (caseMapUi.editType == 'P'
            && caseMapUi.editPayload.laneId == lane.id) {
            const processId = caseMapUi.editPayload.processId;
            // TODO: replace find, it has a execution time of O(n)
            const process = lane.processes.find(p => p.id == processId);

            edit = <div className="desk-edit">
                <ProcessEdit lane={lane} process={process} />
            </div>
        }

        return <div className="desk">
            <div className="desk-lane">
                <h2>{lane.name}</h2>
                <div>{processes}</div>
                <div className="newProcess">
                    <button onClick={this.newProcess.bind(this)}>+</button>
                </div>
            </div>
            <ReactCSSTransitionGroup
                transitionName="newProcess"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={250}>
                {edit && edit}
            </ReactCSSTransitionGroup>
        </div>;
    }
}

const processDndTarget = {
    canDrop() {
        return false;
    },
    hover(props, monitor, component) {
        if (!monitor.isOver({ shallow: true }))
        {
            return;
        }

    }
};

function collectDndTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}
export default DropTarget(ItemTypes.PROCESS, processDndTarget, collectDndTarget)(Stage);
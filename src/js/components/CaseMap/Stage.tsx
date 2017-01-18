import * as React from "react"
import { connect } from "react-redux"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import {List, ListItem, makeSelectable} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import { DropTarget } from 'react-dnd';

import {StageActions, ProcessActions, CaseMapActions} from "../../store/modules/casemap"
import {EditActions} from "../../store/modules/casemapui";
import Process from "./Process";
import {ProcessEdit} from "./ProcessEdit";
import {ItemTypes} from "./Constants";
import PropTypes = React.PropTypes;

export class Stage extends React.Component<any, any> {
    constructor() {
        super();
        this.deleteStage = this.deleteStage.bind(this);
    }

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

    deleteStage() {
        const { lane } = this.props;
        this.context.store.dispatch(StageActions.deleteStage(lane.id));
    }

    render() {
        const { lane } = this.props;
        const { caseMapUi } = this.context.store.getState();

        const editProcessId = caseMapUi.editPayload ? caseMapUi.editPayload.processId : null;
        const processes = (!lane.processes) ? [] : lane.processes.map(process => <Process key={process.id} index={process.id} id={process.id} lane={lane} process={process} idEditing={editProcessId == process.id} />);

        let edit = null;
        if (caseMapUi.editType == 'P'
            && caseMapUi.editPayload.stageId == lane.id) {
            const processId = caseMapUi.editPayload.processId;
            // TODO: replace find, it has a execution time of O(n)
            const process = lane.processes.find(p => p.id == processId);

            edit = <div className="desk-edit">
                <ProcessEdit lane={lane} process={process} />
            </div>
        }

        //const SelectableList = makeSelectable(List);

        return <div className="desk">
            <div className="desk-lane">
                <div>
                    <div><h3>{lane.name}</h3> <FlatButton onClick={this.deleteStage} label="x" labelStyle={{textTransform: 'initial'}}/></div>
                    <List>
                        {processes}
                    </List>
                </div>
                <div className="newProcess"><br/>
                    <FlatButton onClick={this.newProcess.bind(this)} label="+ add a process" labelStyle={{textTransform: 'initial'}}/>
                </div>
            </div>
            <ReactCSSTransitionGroup
                transitionName="newProcess"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={250}>
                {edit && edit}
            </ReactCSSTransitionGroup>
        </div>;
                /*
                * <button onClick={this.newProcess.bind(this)}>+ add a process</button>
                * */
        /*
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
        */
    }
}

const processDndTarget = {
    canDrop() {
        return false;
    },
    hover(props, monitor, component) {
        if (!monitor.isOver({ shallow: true })) {
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
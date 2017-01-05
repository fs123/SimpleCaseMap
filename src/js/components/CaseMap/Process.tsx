import * as React from "react"
import { PropTypes } from 'react';
import { connect } from "react-redux"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from './Constants';

import {StageActions, ProcessActions, CaseMapActions} from "../../store/modules/casemap"
import {EditActions} from "../../store/modules/casemapui";

/**
 * Implements the drag source contract.
 */
const processDndSource = {
    beginDrag(props) {
        return {
            stageId: props.lane.id,
            processId: props.process.id
        };
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        // When dropped on a compatible target, do something
        //const source = monitor.getItem();
        const target = monitor.getDropResult();
        //console.log("end Drag: " + item.process.name);
        //CardActions.moveCardToList(item.id, dropResult.listId);

        component.moveTo(target.stageId, target.processId);

        /*
        props.dispatch(ProcessActions.moveProcess(
            source.stageId, source.processId,
            target.stageId, target.processId));
        */
    }
};

const processDndTarget = {
    drop(props, monitor, component) {
        const processId = props.process.id;
        const stageId = props.lane.id;
        return {stageId, processId};
    }
};

/**
 * Specifies the props to inject into your component.
 */
function collectDndTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

function collectDndSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

export class Process extends  React.Component<any, any> {
    static propTypes = {

        process: PropTypes.object.isRequired,
        lane: PropTypes.object.isRequired,

        // injected by react-redux
        //dispatch: PropTypes.func.isRequired,

        // Injected by React DnD:
        isDragging: PropTypes.bool.isRequired,
        isOver: PropTypes.bool.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
    };

    moveTo(laneId, afterProcessId) {
        this.props.moveTo(laneId, afterProcessId);
    }

    render() {
        const { isDragging, connectDragSource, connectDropTarget, process } = this.props;
        return connectDropTarget(connectDragSource(<div className="item" onClick={this.props.editProcess.bind(this)}>
                <h4>{process.name}</h4>
            </div>
        ))
    }
}

const mapStateToProps = (state, props) => {
    return {};
};

const mapDispatchToProps = (dispatch, myProps) => ({
    editProcess: () => {
        const {lane, process} = myProps;
        return dispatch(EditActions.editProcess(lane.id, process.id));
    },
    moveTo: (toLaneId, afterProcessId) => {
        const {lane, process} = myProps;
        dispatch(ProcessActions.moveProcess(
            lane.id, process.id,
            toLaneId, afterProcessId))
    }
});

export default
    connect(mapStateToProps, mapDispatchToProps)(
        DropTarget(ItemTypes.PROCESS, processDndTarget, collectDndTarget)(
            DragSource(ItemTypes.PROCESS, processDndSource, collectDndSource)(Process)));
import * as React from "react"
import { PropTypes } from 'react';
import { connect } from "react-redux"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from './Constants';

import {StageActions, ProcessActions, CaseMapActions} from "../../store/modules/casemap"
import {EditActions} from "../../store/modules/casemapui";

/**
 * Implements the drag source contract.
 */
const processDndSource = {
    beginDrag(props) {
        props.dndStarted(props.process.id);
        return {
            stageId: props.lane.id,
            processId: props.process.id
        };
    },
    endDrag(props, monitor, component) {

        props.dndEnded();

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
    canDrop(props, monitor) {
        return monitor.getItem().processId != props.process.id;
    },
    drop(props, monitor, component) {
        const processId = props.process.id;
        const stageId = props.lane.id;
        return {stageId, processId};
    },
    hover(props, monitor, component) {
        props.dndHoverOver(props.process.id)
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

class Process extends  React.Component<any, any> {
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
        const { isDragging, connectDragSource, connectDropTarget, process, dndProcessId, dndOverProcessId } = this.props;
        const dndAbove = (dndProcessId && dndOverProcessId && dndProcessId != dndOverProcessId && dndOverProcessId == process.id);

        const processDndPlaceholder = <div className="itemPlaceholder"></div>;

        const icon = <FontIcon
            className="glyphicon glyphicon-hand-right"
        />;

        const iconStyles = {
            marginRight: 5,
        };
        let options = [];
        if (process.optionA) {
            options.push(<span className="glyphicon glyphicon-play-circle" aria-hidden="true" style={iconStyles}/>)
        }

        if (process.optionB) {
            options.push(<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" style={iconStyles}/>)
        }
        if (process.description)
        {
            if (options.length > 0) {
            options.unshift(<br/>);
            }
            options.unshift(process.description);
        }


        const item = (<div>
                <ListItem
                    key={process.id}
                    value={process.id}
                    onClick={this.props.editProcess.bind(this)}
                    primaryText={process.name}
                    leftIcon={icon}
                    secondaryText={options}
                    secondaryTextLines={options.length>2 ? 2 : 1}
                ></ListItem>
            <Divider inset={true} />
        </div>);

        return connectDropTarget(connectDragSource(<div>
                {dndAbove ? processDndPlaceholder : ''}
                {item}
            </div>
        ))

        /*
        return connectDropTarget(connectDragSource(<div>
            {dndAbove ? processDndPlaceholder : ''}
            <div className="item" onClick={this.props.editProcess.bind(this)}>
                <h4>{process.name}</h4>
            </div></div>
        ))
        */
/*
        const card = (<Card>
            <CardHeader
                title={process.name}
            />
            <CardActions>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
            </CardActions>
        </Card>);

        return connectDropTarget(connectDragSource(<div>
                {dndAbove ? processDndPlaceholder : ''}
                {card}
            </div>
            ))
*/
    }
}

const mapStateToProps = (state, props) => {
    return {
        dndProcessId: state.caseMapUi.dndProcessId,
        dndOverProcessId: state.caseMapUi.dndOverProcessId
    };
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
    },
    dndStarted: (processId) => {
        dispatch(EditActions.dndProcessStarted(processId))
    },
    dndEnded: () => {
        dispatch(EditActions.dndProcessEnded());
    },
    dndHoverOver: (processId, after) => {
        dispatch(EditActions.dndHoverOverProcess(processId, after))
    }
});

export default
    connect(mapStateToProps, mapDispatchToProps)(
        DropTarget(ItemTypes.PROCESS, processDndTarget, collectDndTarget)(
            DragSource(ItemTypes.PROCESS, processDndSource, collectDndSource)(Process)));
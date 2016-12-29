import * as React from "react"
import { connect } from "react-redux"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import { requestLanes, addLane, addProcess, updateProcess, toggleEditProcess } from "../actions/caseMapActions"

/*@connect((store) => {
    return {
        caseMap: store.caseMap,
        caseMapUi: store.caseMapUi
    };
})*/
export class CaseMap extends React.Component<any, any> {

    requestLanes(){
        this.props.dispatch(requestLanes())
    }

    render() {
        const { caseMap } = this.props;

        if (!caseMap) {
            return <button onClick={this.requestLanes.bind(this)}>load stages</button>
        }

        const lanes = caseMap.lanes.map(lane => <Lane key={lane.id} lane={lane} />);

        return <div className="caseMap">
            <h1>Simple Case Map</h1>
            <div>{lanes}
                <div className="newStage">
                    <button onClick={this.props.newLane.bind(this)}>+</button>
                </div>
            </div>
        </div>
    }

}

const mapStateToProps = (state) => ({
        caseMap: state.caseMap,
        caseMapUi: state.caseMapUi
});

const mapDispatchToProps = (dispatch) => ({
    newLane: () => {
        dispatch(addLane(new Date().getTime(), "New Stage"));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CaseMap);


export class Lane extends React.Component<any, any> {
    static contextTypes = {
        store: React.PropTypes.object.isRequired,
    };

    newProcess() {
        const { lane } = this.props;
        this.context.store.dispatch(addProcess(lane.id, new Date().getTime(), "New Process"));
    }

    render() {
        const { lane } = this.props;
        const { caseMapUi } = this.context.store.getState();

        const processes = (!lane.processes) ? [] : lane.processes.map(process => <Process key={process.id} lane={lane} process={process} />);

        var edit = null;
        if (caseMapUi.editType == 'P'
         && caseMapUi.editPayload.laneId == lane.id) {
            const processId = caseMapUi.editPayload.process.id;
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


export class Process extends  React.Component<any, any> {
    static contextTypes = {
        store: React.PropTypes.object.isRequired,
    };

    toggleEditProcess() {
        const { process, lane } = this.props;
        console.log("edit " + process.name);
        this.context.store.dispatch(toggleEditProcess(lane.id, process));
    }

    render() {
        const { process } = this.props;
        return <ReactCSSTransitionGroup
            transitionName="newProcess"
            transitionEnterTimeout={2500}
            transitionLeaveTimeout={300}>
            <div className="item" onClick={this.toggleEditProcess.bind(this)}>
                <h4>{process.name}</h4>
            </div>
        </ReactCSSTransitionGroup>
    }
}

export class ProcessEdit extends React.Component<any, any> {
    static contextTypes = {
        store: React.PropTypes.object.isRequired,
    };

    handleChange(event) {
        const { lane, process } = this.props;
        this.context.store.dispatch(updateProcess(
                lane.id,
                process.id,
                event.target.value));
    }

    render() {
        const { lane, process } = this.props;
        return <div>
            <h2>Edit</h2>
            <input type="text" value={process.name} onChange={this.handleChange.bind(this)} />
        </div>
    }
}

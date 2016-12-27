import React from "react"
import { connect } from "react-redux"

import { requestLanes, addLane, addProcess } from "../actions/caseMapActions"

@connect((store) => {
    return {
        caseMap: store.caseMap
    };
})
export default class CaseMap extends React.Component {

    newLane() {
        this.props.dispatch(addLane(new Date().getTime(), "New Lane"));
    }

    requestLanes(){
        this.props.dispatch(requestLanes())
    }

    render() {
        const { caseMap } = this.props;

        if (!caseMap) {
            return <button onClick={this.requestLanes.bind(this)}>load stages</button>
        }

        const lanes = caseMap.lanes.map(lane => <Lane key={lane.id} lane={lane} />);

        return <div>
            <h1>Stages</h1>
            <div>{lanes}</div>
            <div>
                <button onClick={this.newLane.bind(this)}>new stage</button>
            </div>
        </div>
    }
}

export class Lane extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object.isRequired,
    };

    newProcess() {
        const { lane } = this.props;

        this.context.store.dispatch(addProcess(lane.id, new Date().getTime(), "New Process"));
    }

    render() {
        const { lane } = this.props;

        const processes = (!lane.processes) ? [] : lane.processes.map(process => <Process key={process.id} process={process} />);

        return <div>
            <h2>Name: {lane.name}</h2>
            <h3>Processes</h3>
            <div>{processes}</div>
            <div>
                <button onClick={this.newProcess.bind(this)}>new process</button>
            </div>
        </div>
    }
}


export class Process extends React.Component {

    render() {
        const { process } = this.props;

        return <div>
            <h4>Process {process.name}</h4>
        </div>
    }
}

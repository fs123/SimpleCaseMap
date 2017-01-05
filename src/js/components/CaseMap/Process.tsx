import * as React from "react"
import { connect } from "react-redux"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import {StageActions, ProcessActions, CaseMapActions} from "../../store/modules/casemap"
import {EditActions} from "../../store/modules/casemapui";

export class Process extends  React.Component<any, any> {
    static contextTypes = {
        store: React.PropTypes.object.isRequired,
    };

    toggleEditProcess() {
        const { process, lane } = this.props;
        console.log("edit " + process.name);
        this.context.store.dispatch(EditActions.editProcess(lane.id, process.id));
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

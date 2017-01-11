import * as React from "react"
import { connect } from "react-redux"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import {StageActions, ProcessActions, CaseMapActions} from "../../store/modules/casemap"
import {EditActions} from "../../store/modules/casemapui";

export class ProcessEdit extends React.Component<any, any> {
    static contextTypes = {
        store: React.PropTypes.object.isRequired,
    };

    handleChange(event) {
        const { lane, process } = this.props;
        this.context.store.dispatch(ProcessActions.updateProcess(
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

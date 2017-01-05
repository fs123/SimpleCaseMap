import * as React from "react"
import { connect } from "react-redux"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import {StageActions, ProcessActions, CaseMapActions} from "../../store/modules/casemap"
import {EditActions} from "../../store/modules/casemapui";
import {Stage} from "./Stage";

/*@connect((store) => {
 return {
 caseMap: store.caseMap,
 caseMapUi: store.caseMapUi
 };
 })*/
export class CaseMap extends React.Component<any, any> {

    componentWillMount() {
        window['caseMap'] = {loadCaseMap: this.loadCaseMap.bind(this)};
    }

    componentWillUnmount() {
        window['caseMap'] = null;
    }

    storeToIvy() {
        window['ivy']['storeCaseMap'](JSON.stringify(this.props.caseMap));
    }

    loadCaseMap(caseMap) {
        this.props.loadCaseMap(caseMap);
    }

    render() {
        const { caseMap } = this.props;

        const lanes = caseMap.lanes.map(lane => <Stage key={lane.id} lane={lane} />);

        return <div className="caseMap">
            <h1>Simple Case Map</h1>
            <div>{lanes}
                <div className="newStage">
                    <button onClick={this.props.newLane.bind(this)}>+</button>
                </div>
            </div>
            <div><br/><br/><button onClick={this.storeToIvy.bind(this)}>save back to ivy</button></div>
        </div>
    }
}

const mapStateToProps = (state) => ({
    caseMap: state.caseMap,
    caseMapUi: state.caseMapUi
});

const mapDispatchToProps = (dispatch) => ({
    newLane: () => {
        dispatch(StageActions.addStage(new Date().getTime(), "New Stage"));
    },
    loadCaseMap: (caseMap) => {
        dispatch(CaseMapActions.caseMapLoad(caseMap));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CaseMap);
import * as React from "react"
import { connect } from "react-redux"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Toggle from 'material-ui/Toggle';

import {StageActions, ProcessActions, CaseMapActions} from "../../store/modules/casemap"
import {EditActions} from "../../store/modules/casemapui";

export class ProcessEdit extends React.Component<any, any> {
    static contextTypes = {
        store: React.PropTypes.object.isRequired,
    };

    handleFieldChange(event) {
        const { lane, process } = this.props;
        this.context.store.dispatch(ProcessActions.updateProcessField(
            lane.id,
            process.id,
            event.target.name,
            event.target.value));
    }

    optionToggled(event) {
        const { lane, process } = this.props;
        this.context.store.dispatch(ProcessActions.updateProcessField(
            lane.id,
            process.id,
            event.target.name,
            event.target.checked
        ));
    }

    render() {
        const { lane, process } = this.props;
        const textRequired = process.name ? null : "This field is required";
        return <Card>
            <CardText>
                <TextField
                    name="name"
                    hintText="A short and meaningful title"
                    errorText={textRequired}
                    floatingLabelText="Title"
                    value={process.name}
                    onChange={this.handleFieldChange.bind(this)}
                /><br/>
                <TextField
                    name="description"
                    multiLine="true"
                    hintText="A short and meaningful description"
                    floatingLabelText="Description"
                    value={process.description}
                    onChange={this.handleFieldChange.bind(this)}
                />
                <br/><br/>
                <Toggle
                    name="optionA"
                    labelPosition="right"
                    label="Execute next process automatically"
                    toggled={process.optionA}
                    onToggle={this.optionToggled.bind(this)}
                />
                <Toggle
                    name="optionB"
                    labelPosition="right"
                    label="Conditional Execution"
                    toggled={process.optionB}
                    onToggle={this.optionToggled.bind(this)}
                />
            </CardText>
            <CardActions>
                <FlatButton label="Cancel" />
                <FlatButton label="Save" />
            </CardActions>
        </Card>;

        /*
        return <div>
            <h2>Edit</h2>
            <input type="text" value={process.name} onChange={this.handleChange.bind(this)} />
        </div>
        */
    }
}

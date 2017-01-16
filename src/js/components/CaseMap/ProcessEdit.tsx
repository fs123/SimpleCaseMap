import * as React from "react"
import { connect } from "react-redux"
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import ToggleStar from 'material-ui/svg-icons/toggle/star';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';

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

    savePressed() {
        const { lane, process } = this.props;
        this.context.store.dispatch(EditActions.saveEdit());
    }

    cancelPressed() {
        const cancelState = this.context.store.getState().caseMapUi.editPayload.cancelState;
        if (cancelState) {
            const { lane, process } = this.props;
            this.context.store.dispatch(EditActions.cancelEdit());
            this.context.store.dispatch(ProcessActions.updateProcess(lane.id, process.id, cancelState));
        }
    }

    render() {
        const { lane, process } = this.props;
        const textRequired = process.name ? null : "This field is required";
        const styles = {
            block: {
                maxWidth: 250,
            },
            radioButton: {
            },
        };
        return <div>
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
            <br/>
            <RadioButtonGroup name="icon"
                              valueSelected={process.icon}
                              defaultSelected="heart"
                              onChange={this.handleFieldChange.bind(this)}>
                <RadioButton
                    value="glyphicon glyphicon-heart"
                    label="heart"
                    style={styles.radioButton}
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                />
                <RadioButton
                    value="glyphicon glyphicon-star"
                    label="Star"
                    style={styles.radioButton}
                    checkedIcon={<ToggleStar />}
                    uncheckedIcon={<ToggleStarBorder />}
                />
                <RadioButton
                    value="glyphicon glyphicon-flag"
                    label="Flag"
                    style={styles.radioButton}
                />
                <RadioButton
                    value="glyphicon glyphicon-fire"
                    label="Fire"
                    style={styles.radioButton}
                />
            </RadioButtonGroup><br/><br/><br/>
            <CardActions>
                <FlatButton label="Cancel" backgroundColor="rgba(0, 188, 212, 0.498039)" onClick={this.cancelPressed.bind(this)} />
                <FlatButton label="Save" backgroundColor="rgba(0, 188, 212, 0.498039)" onClick={this.savePressed.bind(this)} />
            </CardActions>
        </div>;

        /*
        return <div>
            <h2>Edit</h2>
            <input type="text" value={process.name} onChange={this.handleChange.bind(this)} />
        </div>
        */
    }
}

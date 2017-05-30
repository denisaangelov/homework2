import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class FieldGroup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <FormGroup controlId={this.props.id}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl type={this.props.type} placeholder={this.props.placeholder} componentClass={this.props.componentClass} value={this.props.value} onChange={this.props.onChange}>
                    {this.props.children}
                </FormControl>
            </FormGroup>
        );
    }
}
export default FieldGroup;
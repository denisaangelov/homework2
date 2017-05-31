import React from 'react';
import { connect } from 'react-redux';
import { SplitButton, MenuItem, FormControl } from 'react-bootstrap';

class FilterChooser extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormControl componentClass="select" onChange={(e) => this._handleOnChange(e)} value={this.props.filter}>
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </FormControl>
        )
    }

    _handleOnChange = (e) => {
        this.props.filterPosts(e.target.value);
    }
};

export default FilterChooser;

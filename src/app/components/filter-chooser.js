import React from 'react';
import { connect } from 'react-redux';
import { SplitButton, MenuItem, FormControl } from 'react-bootstrap';

class FilterChooser extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormControl componentClass="select" onChange={(e) => this._handleOnChange(e)}>
                <option value="All" selected={this.props.filter === 'All'}>All</option>
                <option value="Active" selected={this.props.filter === 'Active'}>Active</option>
                <option value="Inactive" selected={this.props.filter === 'Inactive'}>Inactive</option>
            </FormControl>
        )
    }

    _handleOnChange = (e) => {
        this.props.filterPosts(e.target.value);
    }
};

export default FilterChooser;

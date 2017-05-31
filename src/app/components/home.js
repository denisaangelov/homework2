import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

import axios from 'axios';

import { filterPosts, requestPosts, receivePosts } from '../actions';

import FilterChooser from './filter-chooser';
import Posts from './posts';

const styles = {
    col: {
        textAlign: 'center'
    }
}
@connect(
    state => ({}),
    dispatch => ({
        filterPosts: (filter) => {
            dispatch(filterPosts(filter));
        },
        requestPosts: () => {
            dispatch(requestPosts());
            return axios.get('/api/posts')
                .then((response) => {
                    dispatch(receivePosts(response.data));
                });
        }
    })
)
export default class Home extends React.Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.requestPosts();
    }

    render() {
        return (
            <div className="col-sm-12 col-md-12 col-lg-12">
                <div className='row'>
                    <div className="col-xs-4 col-sm-2 col-md-2 col-lg-2" style={styles.col}>
                        <h4>Posts</h4>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" style={styles.col}>
                        <FilterChooser {...this.props} />
                    </div>
                </div>
                <div className='row'>
                    <Posts list />
                </div>
            </div>
        );
    }
}


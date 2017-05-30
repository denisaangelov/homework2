import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { ButtonToolbar, Button, Form, FormGroup } from 'react-bootstrap';

import axios from 'axios';

import { newPost, editPost } from '../actions';

import FieldGroup from './common/field-group';

@connect(
    dispatch => ({
        requestPosts: () => {
            dispatch(requestPosts());
            return axios.get('/api/posts')
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    dispatch(receivePosts(response.data));
                });
        }
    })
)
export default class Home extends React.Component {
    static propTypes = {
        newPost: PropTypes.func.isRequired,
        editPost: PropTypes.func.isRequired,
        redirect: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            author: '',
            text: '',
            tags: '',
            status: 'Active',
            date: Date.now()
        };
    }

    render() {
        return (
            <Form>
                {<FieldGroup id='formTitle' label='Title' type='text' placeholder="Enter title" value={this.state.title} onChange={(e) => this._handleOnChange(e, 'title')} />}
                {<FieldGroup id='formAuthor' label='Author' type='text' placeholder="Enter author" value={this.state.author} onChange={(e) => this._handleOnChange(e, 'author')} />}
                {<FieldGroup id='formText' label='Text' type='text' placeholder="Enter text" componentClass="textarea" value={this.state.text} onChange={(e) => this._handleOnChange(e, 'text')} />}
                {<FieldGroup id='formTags' label='Tags' type='text' placeholder="Enter tags" value={this.state.tags} onChange={(e) => this._handleOnChange(e, 'tags')} />}
                {<FieldGroup id='formStatus' label='Status' type='' placeholder="Enter status" componentClass="select" value={this.state.status} onChange={(e) => this._handleOnChange(e, 'status')}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </FieldGroup>}

                <ButtonToolbar>
                    <Button type="submit" bsStyle="success" onClick={(e) => this._handleOnSubmit(e)}>
                        Submit
                    </Button>
                    <Button type="reset" bsStyle="warning" onClick={(e) => this._handleReset(e)}>
                        Reset
                    </Button>
                    {/*<Button type="button" bsStyle="danger" onClick={(e) => this._handleCancel(e)}>
                        Cancel
                    </Button>*/}
                </ButtonToolbar>
            </Form>
        );
    }

    _handleOnChange = (e, field) => {
        this.setState({
            [field]: e.target.value
        });
    }

    _handleReset = (e) => {
        this.setState({
            title: '',
            author: '',
            text: '',
            tags: '',
            status: 'Active',
            date: Date.now()
        });
    }

    _handleCancel = (e) => {
        this.props.redirect('/');
    }

    _handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.id);
        if (this.state.id) {
            this.props.editPost(this.state);
            this.props.redirect(`/posts/${this.state.id}`);
        }
        else {
            axios.post('/api/posts', this.state);
            this.props.requestPosts();
        }

        this._handleReset();

    }
}


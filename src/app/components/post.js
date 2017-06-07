import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { ButtonToolbar, Button, Form, FormGroup } from 'react-bootstrap';

import axios from 'axios';

import { newPost, editPost, requestPosts } from '../actions';

import FieldGroup from './common/field-group';
import shallowEquals from '../common/utils/shallow-equals';

@connect(
    state => ({}),
    dispatch => ({
        newPost: (post) => {
            return axios.post('/api/posts', post)
                .then((response) => {
                    dispatch(newPost(response.data));
                });
        }
    })
)
export default class Home extends React.Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.post && !shallowEquals(nextProps.post, this.state.post)) {
            this.setState({
                post: Object.assign({}, this.state.post, nextProps.post)
            });
        }
    }

    render() {
        return (
            <Form>
                {<FieldGroup id='formId' label='Id' type='text' placeholder="Post ID" value={this.state.post.id} disabled />}
                {<FieldGroup id='formTitle' label='Title' type='text' placeholder="Enter title" value={this.state.post.title} onChange={(e) => this.props.handleChange(e, 'title')} />}
                {<FieldGroup id='formAuthor' label='Author' type='text' placeholder="Enter author" value={this.state.post.author} onChange={(e) => this.props.handleChange(e, 'author')} />}
                {<FieldGroup id='formText' label='Text' type='text' placeholder="Enter text" componentClass="textarea" value={this.state.post.text} onChange={(e) => this.props.handleChange(e, 'text')} />}
                {<FieldGroup id='formTags' label='Tags' type='text' placeholder="Enter tags" value={this.state.post.tags} onChange={(e) => this.props.handleChange(e, 'tags')} />}
                {<FieldGroup id='formStatus' label='Status' type='' placeholder="Enter status" componentClass="select" value={this.state.post.status} onChange={(e) => this.props.handleChange(e, 'status')}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </FieldGroup>}

                <ButtonToolbar>
                    <Button type="submit" bsStyle="success" onClick={(e) => this.props.handleSubmit(e)}>
                        Submit
                    </Button>
                    <Button type="reset" bsStyle="warning" onClick={(e) => this.props.handleReset(e)}>
                        Reset
                    </Button>
                    {/*<Button type="button" bsStyle="danger" onClick={(e) => this.props.handleCancel(e)}>
                        Cancel
                    </Button>*/}
                </ButtonToolbar>
            </Form>
        );
    }
    /*
        _handleChange = (e, field) => {
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
    
        _handleSubmit = (e) => {
            e.preventDefault();
            if (this.state.post.id) {
                this.props.editPost(this.state.post);
                this.props.redirect(`/posts/${this.state.post.id}`);
            }
            else {
                this.props.newPost(this.state.post);
                // this.props.requestPosts();
            }
    
            this.props.handleReset();
        }
        */
}


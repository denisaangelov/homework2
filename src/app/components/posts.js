import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, ButtonToolbar, Button, Glyphicon, ListGroup, ListGroupItem, Label } from 'react-bootstrap';

import axios from 'axios';

import dateFormat from 'dateformat';
import Post from './post';
import shallowEquals from '../common/utils/shallow-equals';

import { editPost, filterPosts, deletePost, requestPosts, receivePosts, newPost } from '../actions';

const styles = {
    span: {
        width: '100%',
        display: 'block',
        marginBottom: '5px'
    }
}

const getVisiblePosts = (posts, filter) => {
    if (posts.length)
        return posts.filter(post => filter === 'All' ? true : post.status === filter).sort(compare); //.slice(0, 15)
    return [];
};
const compare = (a, b) => {
    return b.date - a.date;
}

@connect(
    state => ({
        posts: state.posts, //getVisiblePosts(state.posts, state.filterPosts)
        filter: state.filterPosts.filter,
        selectedPost: state.selectedPost
    }),
    dispatch => ({
        newPost: (post) => {
            return axios.post('/api/posts/', post)
                .then((response) => {
                    dispatch(newPost(response.data));
                });
        },
        editPost: (post) => {
            axios.put(`/api/posts/${post.id}`, post)
                .then((response) => {
                    dispatch(editPost(response.data));
                });
        },
        deletePost: (id) => {
            return axios.delete(`/api/posts/${id}`)
                .then((response) => {
                    dispatch(deletePost(id));
                });
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
export default class Posts extends React.Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {
            posts: props.posts,
            filter: props.filter,
            post: {
                id: '',
                title: '',
                author: '',
                text: '',
                tags: '',
                status: 'Active',
                date: Date.now()
            }
        }
    }

    componentWillMount() {
        console.log('componentWillMount');
        this.props.requestPosts();
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        const posts = nextProps.posts;
        if (posts && !shallowEquals(posts, this.state.posts)) {
            this.setState({
                posts: posts
            });
        }
        if (nextProps.filter && !shallowEquals(nextProps.filter, this.state.filter)) {
            this.setState({
                filter: nextProps.filter
            });
        }
    }

    render() {
        let posts = (this.props.list && this.state.posts.length) ? this._getListPosts() : this.state.posts;

        let result = null;
        if (posts.length)
            result = (
                <div className="col-sm-12 col-md-12 col-lg-12">
                    {this.props.list ? null :
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <Button bsStyle="primary" title='New post' onClick={(e) => { this._handleReset(e); }}>New</Button>
                            </div>
                        </div>}
                    <div className="row">
                        <div className={this.props.list ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : "col-xs-8 col-sm-8 col-md-8 col-lg-8"} style={styles.col}>
                            <ListGroup>
                                {posts.map(post => {
                                    let date = dateFormat(post.date, 'dd.mm.yyyy');
                                    let isActive = post.status === 'Active';
                                    let toolbar = (this.props.list
                                        ?
                                        <span className='pull-right' >
                                            <Label bsStyle={isActive ? "success" : "warning"}>{post.status}</Label>
                                        </span>
                                        :
                                        <ButtonToolbar className='pull-right'>
                                            <Button type="button" bsStyle="warning" bsSize="small" onClick={(e) => this._handleEdit(e, post.id)} title='Edit'>
                                                <Glyphicon glyph='edit' />
                                            </Button>
                                            <Button type="button" bsStyle="danger" bsSize="small" onClick={(e) => this._handleDelete(e, post.id)} title='Delete'>
                                                <Glyphicon glyph='remove' />
                                            </Button>
                                        </ButtonToolbar>);
                                    let header = (
                                        <div style={{ borderBottom: '1px solid black' }}>
                                            <span style={{ fontSize: '18px' }}>{post.id}.{post.title}</span>

                                            {toolbar}

                                            <span className='pull-right' style={{ fontSize: '16px', paddingRight: '5px' }}><Glyphicon glyph='time' />
                                                {date}
                                            </span>
                                        </div>
                                    )

                                    let text = (this.props.list) ? post.text.slice(0, 150).concat('...') : post.text;
                                    return (
                                        <ListGroupItem key={post.id} header={header} href='#' bsStyle={isActive ? 'success' : 'warning'} title={post.status} type='div'>
                                            <span style={styles.span}>
                                                <Glyphicon glyph='user' />
                                                {post.author}
                                            </span>
                                            <span style={styles.span}>
                                                {text}
                                            </span>
                                            <span style={styles.span}>
                                                tags: {post.tags}
                                            </span>
                                        </ListGroupItem>
                                    )
                                }
                                )}
                            </ListGroup>
                        </div>

                        {this.props.list
                            ? null
                            :
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <Post post={this.state.post} handleChange={this._handleChange} handleReset={this._handleReset} handleSubmit={this._handleSubmit} />
                            </div>
                        }
                    </div>
                </div>
            )
        return result;
    }

    _getListPosts = () => {
        return this.state.posts.filter(post => this.state.filter === 'All' ? true : post.status === this.state.filter).slice(0, 15);
    }

    _getPost = (id) => {
        axios.get(`/api/posts/${id}`)
            .then((response) => {
                console.log(response);
                this.setState({
                    post: Object.assign({}, this.state.post, response.data)
                });
            });
    }

    _handleOnClick = (e) => {
        e.preventDefault();
    }

    _handleEdit = (e, id) => {
        e.preventDefault();
        this._getPost(id);
        // this.props.editPost(flag ? `/posts/${id}` : '/');

    }

    _handleDelete = (e, id) => {
        e.preventDefault();
        this.props.deletePost(id);
    }

    /**
     * post
     */
    _handleChange = (e, field) => {
        this.setState({
            post: Object.assign({}, this.state.post, {
                [field]: e.target.value
            })
        });
    }

    _handleReset = (e) => {
        this.setState({
            post: Object.assign({}, this.state.post, {
                id: '',
                title: '',
                author: '',
                text: '',
                tags: '',
                status: 'Active',
                date: Date.now()
            })
        });
    }

    _handleSubmit = (e) => {
        e.preventDefault();

        // let isEmpty = false;
        // let posts = Object.assign({}, this.state.post);
        // delete posts['id'];
        // Object.values(posts).some((value) => {
        //     if (value === '')
        //         isEmpty = true;
        //     return isEmpty;
        // });
        // if (isEmpty)
        //     return false;
        // console.log(this.state.post);

        if (this.state.post)
            if (this.state.post.id && this.state.post.id !== '') {
                this.props.editPost(this.state.post);
            }
            else {
                this.props.newPost(this.state.post);
            }

        this._handleReset();
    }
}
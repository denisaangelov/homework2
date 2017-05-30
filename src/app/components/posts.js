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

import { editPost, filterPosts, deletePost, requestPosts, receivePosts } from '../actions';

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
        posts: state.posts.all, //getVisiblePosts(state.posts, state.filterPosts)
        filter: state.filterPosts.filter,
        selectedPost: state.selectedPost
    }),
    dispatch => ({
        editPost: (url) => {
            dispatch(push(url));
        },
        deletePost: (id) => {
            dispatch(deletePost(id));
        },
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
export default class Posts extends React.Component {
    static propTypes = {
        editPost: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        console.log('props');
        console.log(props);
        this.state = {
            posts: props.posts,
            filter: props.filter
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        console.log(nextProps);
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
        console.log('state');
        console.log(this.state);

        let posts = (this.props.list && this.state.posts.length) ? this._getListPosts() : this.state.posts;

        let result = null;
        if (posts.length)
            result = (
                <div className="col-sm-12 col-md-12 col-lg-12">
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
                                <Post />
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

    _handleOnClick = (e) => {
        e.preventDefault();
    }

    _handleEdit = (e, id) => {
        e.preventDefault();
        this.props.editPost(flag ? `/posts/${id}` : '/');

    }

    _handleDelete = (e, id) => {
        e.preventDefault();
        // this.props.deletePost(id);
        axios.delete(`/api/posts/${id}`);
    }
}
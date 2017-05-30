import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router';

import Home from '../home';
import Post from '../post';
import Posts from '../posts';
import About from '../about';

@withRouter
@connect()
export default class Container extends React.Component {
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <Route exact path="/" component={Home} />
                    {/*<Route path="/post/:id?" component={Post} />*/}
                    <Route path="/posts/:id?" component={Posts} />
                    <Route path="/about" component={About} />
                </div>
            </div>
        );
    }
};
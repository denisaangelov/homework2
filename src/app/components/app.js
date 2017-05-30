import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from './common/header';
import Container from './common/container';

@withRouter
@connect()
class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Container />
            </div>
        );
    }
}

export default App;

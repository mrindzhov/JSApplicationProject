import React, {Component} from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import Infobox from  './components/common/Infobox';
import {Link} from 'react-router';
import observer from './models/observer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false, username: '' };
        observer.onSessionUpdate = this.onSessionUpdate.bind(this);
    }

    componentDidMount() {
        this.onSessionUpdate();
    }

    onSessionUpdate() {
        let name = sessionStorage.getItem("username");
        if (name) {
            this.setState({ loggedIn: true, username: sessionStorage.getItem("username") });
        } else {
            this.setState({ loggedIn: false, username: '' });
        }
    }

    render() {
        let navbar = {};
        if (!this.state.loggedIn) {
            navbar = (
                <Navbar>
                    <navbar>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/" onlyActiveOnIndex={true}>Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                    </navbar>
                </Navbar>
            );
        } else {
            navbar = (
                <Navbar>
                    <navbar>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/" onlyActiveOnIndex={true}>Home</Link></li>
                        <li><Link to="/posts">Posts</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                    </navbar>
                </Navbar>
            );
        }


        return (
            <div className="container">
                <Header loggedIn={this.state.loggedIn} user={this.state.username}>
                    {navbar}
                </Header>
                {this.props.children}
                <Infobox/>
            </div>
        )
    }
}

export default App;

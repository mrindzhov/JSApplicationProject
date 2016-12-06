import React, {Component} from 'react';

export default class Greeting extends Component {
    render() {
        if (this.props.user === '' || this.props.user === undefined) {
            return null;
        } else {
            return (
                <ul className="nav navbar-nav navbar-left">
                    <li><a>Welcome, {this.props.user}</a></li>
                </ul>
            );
        }
    }
}
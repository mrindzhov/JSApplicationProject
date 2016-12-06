import React, {Component} from 'react';
import Greeting from '../common/Greeting';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="jumbotron text-center">Блогче</h1>
                <Greeting user={this.props.user}/>
                {this.props.children}
            </div>
        );
    }
}
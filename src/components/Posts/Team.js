import React, {Component} from 'react';
import {Link} from 'react-router';
import './Team.css';

export default class Team extends Component {
    render() {
        return (
            <Link to={"/posts/" + this.props.id} className="team-box">
                <span className="spanner"><h2>{this.props.title}</h2></span>
                {/*<span className="title">{this.props.title}</span>*/}
                <span className="spanner">{this.props.date}</span>
                <span className="spanner">{this.props.author}</span>
                <span className="spanner">{this.props.likes}</span>
                <span className="spanner">{this.props.comments}</span>
                <p>{this.props.content || 'No description'}</p>
            </Link>
        )
    }
}
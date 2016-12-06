import React, {Component} from 'react';
import {Link} from 'react-router';
import './Team.css';

export default class Team extends Component {
    render() {
        return (
            <Link to={"/posts/" + this.props.id} className="team-box">
                <span
                    className="title"><h2>{this.props.title.length > 50 ? this.props.title.slice(0, 50) + " ..." : this.props.title}</h2></span>
                <span className="spanner"><i>Created on: </i>{this.props.date} <i>by: </i>{this.props.author}</span>
                <span className="spanner-left">{this.props.likes} likes, {this.props.comments === 'empty' || this.props.comments === undefined ? 0 : this.props.comments.length} comments</span>
                <p>{this.props.content.length > 150 ? this.props.content.slice(0, 150) + " ..." : this.props.content || 'No description'}</p>
            </Link>
        )
    }
}
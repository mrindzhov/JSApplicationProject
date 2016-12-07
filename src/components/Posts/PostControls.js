import React, {Component} from 'react';
import {Link} from 'react-router';

export default class PostControls extends Component {
    render() {
        let edit = null;
        let deletePost = null;

        if (this.props.author === sessionStorage.getItem('username')) {
            edit = <Link to={"/edit/" + this.props.postId} className="btn btn-default">Edit info</Link>;
            deletePost = <Link to={"/delete/" + this.props.postId} className="btn btn-default">Delete</Link>;
        }
        return (
            <div>
                {edit}
                {deletePost}
            </div>
        )
    }
}
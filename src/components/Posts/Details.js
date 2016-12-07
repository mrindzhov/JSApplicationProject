import React, {Component} from 'react';
import {loadPostDetails,loadUsersDetails} from '../../models/post';
import PostControls from './PostControls';
import './Details.css';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            comments: [],
            likes:0,
            author:'',
            canEdit: false,
            ownTeam: sessionStorage.getItem('postId') === this.props.params.postId
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onUsersSuccess = this.onUsersSuccess.bind(this);
        this.statusChange = this.statusChange.bind(this);
    }

    statusChange(response) {
        this.context.router.push('/');
    }

    componentDidMount() {
        loadPostDetails(this.props.params.postId, this.onLoadSuccess);
        loadUsersDetails(this.props.params.postId, this.onUsersSuccess);
    }

    onLoadSuccess(response) {
        let newState = {
            id:response._id,
            title: response.title,
            content: response.content,
            author: response.author,
            date: response.date,
            comments: response.comments,
            likes: response.likes
        };

        if (response._acl.creator === sessionStorage.getItem('userId')) {
            newState.canEdit = true;
        }
        this.setState(newState);
    }

    onUsersSuccess(response) {
        this.setState({
            comments: response
        });
    }

    render() {
        /*let title = 'Post details';
        if (this.state.name !== '') {
            title = this.state.name + ' details';
        }*/
        return (
            <div className="details-box">
                <span className="id" hidden>{this.state.id}</span>
                <span className="titlebar">{this.state.title}</span>
                <span className="spanner">Author</span>
                <p>{this.state.author || 'No author'}</p>
                <span className="spanner">Content</span>
                <p>{this.state.content || 'No content'}</p>
                <span className="spanner">Likes: {this.state.likes} Comments: {this.props.comments==='empty'||this.props.comments===undefined?0:this.props.comments.length}</span>

                <p>{this.props.comments}</p>

                <PostControls
                    postId={this.props.params.postId}
                    canEdit={this.state.canEdit}
                    author={this.state.author}
                />
            </div>
        );
    }
}

Details.contextTypes = {
    router: React.PropTypes.object
};
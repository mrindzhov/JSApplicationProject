import React, {Component} from 'react';
import DeleteForm from '../Delete/DeleteForm';
import {loadPostDetails, deletePost} from '../../models/post';

export default class DeletePage extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', content: '',author:'',date:'',likes:'',comments:'', submitDisabled: true};
        this.bindEventHandlers();
    }

    componentDidMount() {
        // Populate form
        loadPostDetails(this.props.params.postId, this.onLoadSuccess);
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess(response) {
        this.setState({
            title: response.title,
            content: response.content,
            author: response.author,
            date: response.date,
            likes: response.likes,
            comments: response.comments,
            submitDisabled: true
        });
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({submitDisabled: true});
        deletePost(this.props.params.postId,this.onSubmitResponse);
    }
    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            this.context.router.push('/posts');
        } else {
            // Something went wrong, let the user try again
            this.setState({submitDisabled: true});
        }
    }
    render() {
        return (
            <div>
                <h1>Delete Post</h1>
                <DeleteForm
                    title={this.state.title}
                    content={this.state.content}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        );
    }
}

DeletePage.contextTypes = {
    router: React.PropTypes.object
};
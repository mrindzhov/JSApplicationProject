import React, {Component} from 'react';
import Post from './Post';
import {loadPosts} from '../../models/post';
import {Link} from 'react-router';
export default class PostsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess(response) {
        // Display posts
        this.setState({posts: response})
    }

    componentDidMount() {
        // Request list of posts from the server
        loadPosts(this.onLoadSuccess);
    }

    render() {
        let createLink = null;
        if (!sessionStorage.getItem('postId')) {
            createLink = <Link to="/create" className="btn btn-default btn-block">Create post</Link>
        }

        return (
            <div>
                {createLink}
                <div>
                    {this.state.posts.map((e, i) => {
                        return <Post key={i} author={e.author} title={e.title} id={e._id} content={e.content} date={e.date} likes={e.likes} comments={e.comments}/>
                    })}
                </div>
            </div>
        );
    }
}
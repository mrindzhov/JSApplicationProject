import React, {Component} from 'react';
import Team from './Team';
import {loadTeams} from '../../models/team';
import {Link} from 'react-router';
//import observer from '../../models/observer';

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
        loadTeams(this.onLoadSuccess);
    }

    render() {
        let createLink = null;
        if (!sessionStorage.getItem('postId')) {
            createLink = <Link to="/create" className="btn btn-default">Create post</Link>
        }

        return (
            <div>
                <h1>Posts Page</h1>
                {createLink}
                <div>
                    {this.state.posts.map((e, i) => {
                        return <Team key={i} author={e.author} title={e.title} id={e._id} content={e.content} date={e.date} likes={e.likes} comments={e.comments}/>
                    })}
                </div>
            </div>
        );
    }
}
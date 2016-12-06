import React, {Component} from 'react';
import {loadTeamDetails, loadUsersDetails} from '../../models/team';
import {joinTeam, leaveTeam} from '../../models/user';
import TeamControls from './TeamControls';
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
            ownTeam: sessionStorage.getItem('teamId') === this.props.params.teamId
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.onUsersSuccess = this.onUsersSuccess.bind(this);
        this.onJoin = this.onJoin.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.statusChange = this.statusChange.bind(this);
    }

    onJoin(event) {
        event.preventDefault();
        joinTeam(this.props.params.teamId, this.statusChange);
    }

    onLeave(event) {
        event.preventDefault();
        leaveTeam(this.statusChange);
    }

    statusChange(response) {
        this.context.router.push('/');
    }

    componentDidMount() {
        loadTeamDetails(this.props.params.teamId, this.onLoadSuccess);
        loadUsersDetails(this.props.params.teamId, this.onUsersSuccess);
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
        /*let members = <p>No member info</p>;
        if (this.state.members.length > 0) {
            members = (
                <div>
                    {this.state.members.map((e, i) => <span key={i} className="member">{e.username}</span>)}
                </div>
            );
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

                <TeamControls
                    teamId={this.props.params.teamId}
                    onJoin={this.onJoin}
                    onLeave={this.onLeave}
                    canEdit={this.state.canEdit}
                    ownTeam={this.state.ownTeam}
                />
            </div>
        )
    }
}

Details.contextTypes = {
    router: React.PropTypes.object
};
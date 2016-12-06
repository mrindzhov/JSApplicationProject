// eslint-disable-next-line
import {get, post, update} from './requester';
import {joinTeam} from './user';

function loadTeams(callback) {
    // Request teams from db
    get('appdata', 'posts', 'kinvey')
        .then(callback);
}

function loadTeamDetails(teamId, onTeamSuccess) {
    get('appdata', 'posts/' + teamId, 'kinvey')
        .then(onTeamSuccess);
}

function loadUsersDetails(teamId, onUsersSuccess) {
    get('user', `?query={"teamId": "${teamId}"}`, 'kinvey')
        .then(onUsersSuccess);
}

function edit(teamId, name, description, callback) {
    let teamData = {
        name: name,
        comment: description
    };
    update('appdata', 'teams/' + teamId, teamData, 'kinvey')
        .then(callback(true));
}

function create(title, content, callback) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth(); //January is 0!
    let yyyy = today.getFullYear();
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = dd+' '+monthNames[mm]+' '+yyyy;
    let teamData = {
        title: title,
        content: content,
        date:today,
        author:sessionStorage.getItem('username'),
        likes:0,
        comments:['empty']
    };
    post('appdata', 'posts', teamData, 'kinvey')
        .then((response) => {
            joinTeam(response._id, callback);
        });
}

export {loadTeams, loadTeamDetails, loadUsersDetails, edit, create};
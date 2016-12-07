// eslint-disable-next-line
import {get, post, update,deleteMe} from './requester';

function loadPosts(callback) {
    // Request teams from db
    get('appdata', 'posts', 'kinvey')
        .then(callback);
}

function loadPostDetails(postId, onPostSuccess) {
    get('appdata', 'posts/' + postId, 'kinvey')
        .then(onPostSuccess);
}

function loadUsersDetails(postId, onUsersSuccess) {
    get('user', `?query={"postId": "${postId}"}`, 'kinvey')
        .then(onUsersSuccess);
}

function edit(postId, title, content,author,date,likes,comments, callback) {
    let postData = {
        title: title,
        content: content,
        author: author,
        date: date,
        likes: likes,
        comments: comments,
    };
    update('appdata', 'posts/' + postId, postData, 'kinvey')
        .then(callback(true));
}
function deletePost(postId, callback) {
    deleteMe('appdata', 'posts/' + postId, 'kinvey')
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

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + ' ' + monthNames[mm] + ' ' + yyyy;
    let postData = {
        title: title,
        content: content,
        date: today,
        author: sessionStorage.getItem('username'),
        likes: 0,
        comments: ['empty']
    };
    post('appdata', 'posts', postData, 'kinvey')
        .then(callback(true));
}


export {loadPosts, loadPostDetails, loadUsersDetails, edit, create,deletePost};
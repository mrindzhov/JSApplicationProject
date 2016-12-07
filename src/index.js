import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import HomePage from './components/Home/HomePage';
import Posts from './components/Posts/Posts';
import About from './components/About/AboutPage';
import Login from './components/Login/LoginPage';
import Register from './components/Register/RegisterPage';
import Logout from './components/Logout/LogoutPage';
import Details from './components/Posts/Details';
import Edit from './components/Edit/EditPage';
import Delete from './components/Delete/DeletePage';
import Create from './components/Create/CreatePage';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="posts">
                <IndexRoute component={Posts}/>
                <Route path=":postId" component={Details}/>
            </Route>
            <Route path="about" component={About}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="logout" component={Logout}/>
            <Route path="edit/:postId" component={Edit}/>
            <Route path="delete/:postId" component={Delete}/>
            <Route path="create" component={Create}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
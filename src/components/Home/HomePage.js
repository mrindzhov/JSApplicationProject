import React, {Component} from 'react';
import '../../App.css'

export default class HomePage extends Component {
    render() {
        let message = <p>You are currently not logged in. Логни се да видиш земята.</p>;

        if (sessionStorage.getItem('username')) {
            message = <div id="earth"></div>;
        }
        return (
            <div>
                <h1>Home Page</h1>

                {message}
            </div>
        );
    }
}
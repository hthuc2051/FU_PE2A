import React, { Component } from 'react';

const PAGE_TITLE = "Not found page"

class NotFoundPage extends Component {

    UNSAFE_componentWillMount() {
        document.title = PAGE_TITLE;
    }
    render() {
        return (
            <div>
                <div id="notfound">
                    <div class="notfound">
                        <div class="notfound-404">
                            <h1>404</h1>
                        </div>
                        <h2>Oops! Page not be found</h2>
                        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. 
                            <a href="/lecturer"> Return to dashboard</a></p>
                      
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFoundPage;

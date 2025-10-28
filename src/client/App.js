import React from 'react';
import { Helmet } from 'react-helmet';
import '../../assets/css/style.css';

const App = () => {
    return (
        <div className="container">
            <Helmet>
                <title>Tarocco - Card Reading</title>
                <meta name="description" content="Newsfeed of all your friends on Graphbook" />
            </Helmet>
            <div>Hello World!</div>
        </div>
    )
}

export default App
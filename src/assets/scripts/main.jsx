window.jQuery = require('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
require('bootstrap.css');
require('style/achievements-layout.scss');
                        

var AchievementsMenu = require('./components/achievements-menu.jsx');
ReactDOM.render(<AchievementsMenu/>, document.getElementById('achievements-menu'));

class RouteController extends React.Component {
   
    getPartial(route) {
        if (!route || route.length === 1) {
            return require('./partials/achievements-home-page.jsx');
        } else if (route === '#/achievements') {
            return require('./partials/achievements-achievements-page.jsx');
        }
    }
   
    render() {
        var Partial = this.getPartial(this.props.route);
        return (
            <div className="achievements-body">
                <Partial />
            </div>
        );
    }
    
};

var resolveRoute = function () {
    let route = window.location.hash;
    ReactDOM.render(<RouteController route={route}/>, document.getElementById('achievements-page'));  
};

// Resolve route on hash change
window.onhashchange = resolveRoute;

// Resolve current route
resolveRoute();
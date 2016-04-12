import React from 'react';
require('bootstrap');
require('style/achievements-menu.scss');
var medalImage = require('image/Medal2.png');

var routes = [
    { name: 'Home', url: '#' },
    { name: 'Achievements', url: '#/achievements' }
];

class NavItem extends React.Component{
    
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.props.onSelect(this.props.name);
    }
    
    render() {
        return (
            <li className={(this.props.active) ? 'active' : ''} onClick={this.handleClick}>
                <a href={this.props.url}>{this.props.name}</a>
            </li>            
        );
    }
    
}

class AchievementsMenu extends React.Component{
    
    constructor(props) {
        super(props);
        
        this.navItemClicked = this.navItemClicked.bind(this);
        this.urlChangedHandler = this.urlChangedHandler.bind(this);
        this.statusChangeCallback = this.statusChangeCallback.bind(this);
        this.checkLoginState = this.checkLoginState.bind(this);
        
        this.state = this._getInitialState();
    }
    
    _getInitialState() {
        return {
            menuItems: routes,
            activeItem: 'Home'        
        };
    }
    
    componentDidMount() {
		window.addEventListener('hashchange', this.urlChangedHandler);
        this.initFacebook();
    }
	
	componentWillUnmount() {
		window.removeEventListener('hashchange', this.urlChangedHandler);
	}
    
    initFacebook() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '',
                cookie     : true,  // enable cookies to allow the server to access
                                    // the session
                xfbml      : true,  // parse social plugins on this page
                version    : 'v2.5' // use version 2.5
            });

            // Now that we've initialized the JavaScript SDK, we call
            // FB.getLoginStatus().  This function gets the state of the
            // person visiting this page and can return one of three states to
            // the callback you provide.  They can be:
            //
            // 1. Logged into your app ('connected')
            // 2. Logged into Facebook, but not your app ('not_authorized')
            // 3. Not logged into Facebook and can't tell if they are logged into
            //    your app or not.
            //
            // These three cases are handled in the callback function.
            FB.getLoginStatus(function(response) {
                this.statusChangeCallback(response);
            }.bind(this));
        }.bind(this);
        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    
    // This is called with the results from from FB.getLoginStatus().
    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
    }
    
    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    checkLoginState() {
        FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
        }.bind(this));
    }
    
    urlChangedHandler() {
        var route = window.location.hash;
        if(route === '') {
            route = '#';
        }
        let issue = false;
        for(let i = 0; i < this.state.menuItems.length; i++) {
            if(this.state.activeItem === this.state.menuItems[i].name) {
                if(route !== this.state.menuItems[i].url) {
                    console.info('WARNING: the URL has been manually changed');
                    issue = true;
                    break;
                }
            }
        }
        if(issue) {
            for(let i = 0; i < this.state.menuItems.length; i++) {
                if(route === this.state.menuItems[i].url) {
                    this.setState({ activeItem: this.state.menuItems[i].name });
                    break;
                }
            }
        }
    }
    
    navItemClicked(name) {
        if(name !== this.state.activeItem) {
            this.setState({ activeItem: name });
        }
    }

    render() {
        var navItemClicked = this.navItemClicked;
        var activeItem = this.state.activeItem;
        let navItems = this.state.menuItems.map(function(menuItem) {
            let active = (menuItem.name === activeItem);
            return (
                <NavItem    name={menuItem.name}
                            active={active}
                            url={menuItem.url}
                            onSelect={navItemClicked}
                            key={menuItem.name} />                                        
            );
        });
        
        return (
            <nav className="navbar navbar-default navbar-fixed-top achievements-menu">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand achievements-brand" href="#"><img src={medalImage} /></a>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-collapse-1">
                        <ul className="nav navbar-nav achievements-links">
                            {navItems}
                        </ul>
                        <div className="fb-login-button pull-right" onlogin="checkLoginState" data-size="medium" data-show-faces="true" data-auto-logout-link="true"></div>
                    </div>
                </div>
            </nav>      
        );
    }
};

module.exports = AchievementsMenu;
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
	}

	
	componentWillUnmount() {
		window.removeEventListener('hashchange', this.urlChangedHandler);
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
                        <button type="button" className="btn btn-default navbar-btn navbar-right">Sign in</button>
                    </div>
                </div>
            </nav>      
        );
    }
};

module.exports = AchievementsMenu;
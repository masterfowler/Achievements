import React from 'react';
require('bootstrap');

class HomePage extends React.Component{
    
    render() {
        return (
            <div className="achievements-panel">
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 col-sm-offset-0 col-sm-12">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Input..." />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button">Go!</button>
                            </span>
                        </div>
                    </div>                
                </div>     
            </div>
        );
    }
    
};

module.exports = HomePage;
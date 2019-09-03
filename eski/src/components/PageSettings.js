import React, { Component } from 'react'

export default class PageSettings extends Component {
    render() {
        return (
            <div>
                   
                   <form className="form-inline md-form mr-auto mb-4">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                            <button className="btn aqua-gradient btn-rounded btn-sm my-0" type="submit">Search</button>
                    </form>
                   
            </div>
        )
    }
}

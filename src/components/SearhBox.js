import React, { Component } from 'react'


class SearchBox extends Component {

    state = {
        word : "",
    };

    onWordChange(e){

        this.setState({
            [e.target.name] : e.target.value
        });
    }
    onWordSubmit(e){
        console.log("basıldı")
        
        
        
        e.preventDefault();
    }

    render() {
        const {word} = this.state;
        return (
            <div className = "card">
                
                <div className = "card-body">
                    <form onSubmit = {this.onWordSubmit.bind(this)}>
                        <div className = "form-group">
                            
                            <input
                                type = "text"
                                name = "word"
                                id = "name"
                                placeholder = "Please enter search key"
                                className = "form-control"
                                value = {word}
                                onChange = {this.onWordChange.bind(this)}
                                
                            />
                            
                        </div>
                        
                        <button type = "submit" className = "btn btn-danger btn-block">Search</button>

                    </form>

                </div>
                
            </div>
        )
    }
}
export default SearchBox;
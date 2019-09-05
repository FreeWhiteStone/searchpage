import React, { Component } from 'react'

class FetchData extends Component {
    
    //let searchKey = "";
    
  state = {
    contacts: [],
    images : [],
    searchKey : ""
  }

  onWordChange(e){

    this.setState({
        [e.target.name] : e.target.value
    });
}

  componentDidMount = () => {
    
              }     


    render() {

        const {word} = this.props;
        
        console.log(word)
        console.log("alo1")
        console.log()
        

        
        
        return (
            <div className="active-cyan-4 mb-4">
                
                  <Contacts contacts={this.state.contacts} />
            </div>
        )
    }
}
export default FetchData;
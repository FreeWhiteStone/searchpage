import React , {Component} from 'react';
import './App.css';
import Contacts from "./components/contacts"

class App extends Component {

  state = {
    word : "",
    contacts: [],
    detail : [],
    images : [],
    searchKey : ""
  }
 
 

onWordChange(e){

  
    this.setState({
        [e.target.name] : e.target.value
    });
}
onWordSubmit(e){
    
    console.log(this.state.searchKey)
    let tempArray = [];
    let tempDetail = [];
    
            var request = require("request");

            var options = { method: 'GET',
              url: 'https://api.cognitive.microsoft.com/bing/v7.0/search',
              qs: { q: this.state.searchKey },
              headers: 
               { 'cache-control': 'no-cache',
                 Connection: 'keep-alive',
                 'Accept-Encoding': 'gzip, deflate',
                 Host: 'api.cognitive.microsoft.com',
                 'Postman-Token': 'd52df569-1084-4f77-9558-4cf6bb39ed77,d4b84bf5-23fc-4fde-b34e-fffb4d304830',
                 'Cache-Control': 'no-cache',
                 Accept: '*/*',
                 'User-Agent': 'PostmanRuntime/7.15.2',
                 'Ocp-Apim-Subscription-Key': 'f873c9adcaa94d18ad0778c5f2ff222b' } };
            
            request(options, function (error, response, body) {
              
              if (error) throw new Error(error);
            
              if(!this.state.searchKey){
                  console.log("")
              } else {

                let apiBody = JSON.parse(body);
                console.log(apiBody)

              let webLeng = apiBody.webPages.value.length;
             
              
              for (let i = 0; i < webLeng; i++) {
                    let temp_web = apiBody.webPages.value[i].url;
                    let temp_detail = apiBody.webPages.value[i].name;
                    
                    tempArray.push(temp_web);
                    tempDetail.push(temp_detail);

                  }
            /*
            let imageLeng = apiBody.images.value.length;

              for (let i = 0; i < imageLeng; i++) {
                    let temp_img = apiBody.images.value[i].hostPageUrl;
                    tempArray.push(temp_img);
                }*/ 
                  this.setState({ contacts: tempArray})
                  this.setState({ detail: tempArray})
               



              }
              
                 
            }.bind(this));

    
    e.preventDefault();
}

  render() {

    const {searchKey} = this.state;
    
    return (
      <div className="container">
        <div>
              <center >
              <img src="https://s2.turkcell.com.tr/SiteAssets/Bireysel/Servis/render/gorseller/yaani_4/yaani_4_305x229.png" width={120} height={100} mode='fit'alt="new"></img>
              <h4>Yaani Search Page</h4>
              
              <div className = "card">
                
                <div className = "card-body">
                    <form onSubmit = {this.onWordSubmit.bind(this)}>
                        <div className = "form-group">
                            
                            <input
                                type = "text"
                                name = "searchKey"
                                id = "name"
                                placeholder = "Please enter search key"
                                className = "form-control"
                                value = {searchKey}
                                onChange = {this.onWordChange.bind(this)}
                                
                            />
                            
                        </div>
                        
                        <button type = "submit" className = "btn btn-danger btn-block">Search</button>

                    </form>
                    <Contacts contacts={this.state.contacts} detail={this.state.detail}/>

                </div>
                
            </div>


              </center>
              
              
        </div>
        
       
      </div>
      
    )
  }
}


export default App;

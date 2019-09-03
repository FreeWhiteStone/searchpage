import React , {Component} from 'react';
import './App.css';
import Contacts from "./components/contacts"
import styles from "../src/App.module.css"
import AutoSuggest from "./components/AutoSuggest"

class App extends Component {

  state = {
    word : "",
    contacts: [],
    detail : [],
    images : [],
    searchKey : "",
    web_name : [],
    displayUrl : [],
    snippet : [],
    count : 10,
    offset : 0,
    idsi : 1,
    searchSuggestionsArray : [],
  }
 
  componentDidMount (e) {
         let tempSuggArr = [];
    var request = require("request");

    var options = { method: 'GET',
      url: 'https://api.cognitive.microsoft.com/bing/v7.0/suggestions',
      qs: { q : this.state.searchKey},
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
    
     
        //console.log("ilk parse")

        let apiBody = JSON.parse(body);
        console.log(apiBody)

        let suggestCount = apiBody.suggestionGroups[0].searchSuggestions.length;
        console.log(suggestCount)

        if(suggestCount === 0){
          console.log("bos sugg")
          this.setState({ searchSuggestionsArray: tempSuggArr})
        }
        else{
          for (let i = 0; i < suggestCount; i++) {

            tempSuggArr.push(apiBody.suggestionGroups[0].searchSuggestions[i].displayText)
            
              }
  
              this.setState({ searchSuggestionsArray: tempSuggArr})
        }
        
         
    }.bind(this));



}


 handleClick = (e) => {

  if(e.target.id === 1){

    this.setState({
      offset : 0
    });


    console.log("zaten 1")
  } else{

    this.setState({
      idsi : parseInt(e.target.id)
  });

var tempID =  this.state.idsi;

this.setState({
  offset : parseInt(tempID *10)
});

this.onWordSubmit(e);


  }
      
      
  console.log(this.state.offset)
}
  

onWordChange(e){

  
    this.setState({
        [e.target.name] : e.target.value
    });

    this.componentDidMount();
}
onWordSubmit(e){

  console.log("is aaaaaaaaaa")
    
    let tempArray = [];
    let tempName = [];
    let tempDispUrl_arr = [];
    let tempSnip_arr = [];
    
   
            var request = require("request");

            var options = { method: 'GET',
              url: 'https://api.cognitive.microsoft.com/bing/v7.0/search',
              qs: { 
                q : this.state.searchKey,
                count : this.state.count,
                offset : this.state.offset},
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

                //console.log("ilk parse")

                let apiBody = JSON.parse(body);
                //console.log(response)

              let webLeng = apiBody.webPages.value.length;

              
              for (let i = 0; i < webLeng; i++) {
                    let temp_web = apiBody.webPages.value[i].url;
                    let temp_web_name = apiBody.webPages.value[i].name;
                    let temp_disp_url = apiBody.webPages.value[i].displayUrl;
                    let temp_snip = apiBody.webPages.value[i].snippet;

                    tempArray.push(temp_web);
                    tempName.push(temp_web_name);
                    tempDispUrl_arr.push(temp_disp_url);
                    tempSnip_arr.push(temp_snip);


                  }

            /*
            let imageLeng = apiBody.images.value.length;

              for (let i = 0; i < imageLeng; i++) {
                    let temp_img = apiBody.images.value[i].hostPageUrl;
                    tempArray.push(temp_img);
                }*/ 
                  this.setState({ contacts: tempArray})
                  this.setState({ web_name: tempName})
                  this.setState({ displayUrl: tempDispUrl_arr})
                  this.setState({ snippet: tempSnip_arr})



              }
              
                 
            }.bind(this));

    
    e.preventDefault();
}

  render() {


    const {searchKey} = this.state;
    const {searchSuggestionsArray} = this.state;
    console.log(searchKey)
    console.log(searchSuggestionsArray)
    
    return (
      <div className="container">
          <div>
                <center >
                    <img src="https://s2.turkcell.com.tr/SiteAssets/Bireysel/Servis/render/gorseller/yaani_4/yaani_4_305x229.png" width={120} height={100} mode='fit'alt="new"></img>
                    <h4>Yaani Search Page</h4>
                </center>
          </div>
               
                <div>
                    <form onSubmit = {this.onWordSubmit.bind(this)}>
                        <div className = "form-group">
                            
                            <input
                                type = "text"
                                name = "searchKey"
                                id = "name"
                                placeholder = "Please enter search key"
                                className = "form-control"
                                value = {searchKey}
                                onChange = {e =>{this.onWordChange(e);
                                              this.componentDidMount(e)}
                                }
                                
                                
                            />
                            <AutoSuggest suggestWord={this.state.searchSuggestionsArray}></AutoSuggest>
                            
                        </div>
                        
                        <button type = "submit" className = "btn btn-danger">Search</button>

                    </form>
                    </div>
                    <Contacts contacts={this.state.contacts} web_name={this.state.web_name} displayUrl={this.state.displayUrl} snippet={this.state.snippet}/>

                    <div className={styles.pagination}>
                    <div className={styles.app}>


        <div className={styles.pagination}>
          <span>&laquo;</span>
          <span id={1} className={styles.active} onClick={this.onWordSubmit}>1</span>
          <span id={2} onClick={this.handleClick}>2</span>
          <span id={3} onClick={this.handleClick}>3</span>
          <span id={4} onClick={this.handleClick}>4</span>
        </div>

      </div>
        </div>
        
      </div>
      
    )
  }
}


export default App;


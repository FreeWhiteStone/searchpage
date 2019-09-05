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
    pageClassName : "",
    isVisible : "shown",
    imagesUrl : [],
    tumImages : "",
    imagesFor : "",

  }
  sayHello =() => {
    
    this.setState({ isVisible: "hidden"})
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
      'Postman-Token': '72654749-4fe5-4ad6-9af0-83e17067847d,6c739254-0fbd-4df5-b235-95b8bcb466bc',
      'Cache-Control': 'no-cache',
      Accept: '*/*',
      'User-Agent': 'PostmanRuntime/7.16.3',
      'Ocp-Apim-Subscription-Key': '1616861c0aea466ca23683fdeb513ca2' } };
    
    request(options, function (error, response, body) {
      
      if (error) throw new Error(error);
    
     
        //console.log("ilk parse")

        let apiBody = JSON.parse(body);
        //console.log(apiBody)

        let suggestCount = apiBody.suggestionGroups[0].searchSuggestions.length;
        //console.log(suggestCount)

        if(suggestCount === 0){
         // console.log("bos sugg")
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

  var tempId = parseInt(e.target.id);

  
  this.setState({
    pageClassName : "d-block bg-primary text-white"
  });


  if(tempId === 1){

    this.setState({
      idsi : tempId,
      offset : 0
    });
        console.log("id:", this.state.idsi ," offset", this.state.offset)
        this.onWordSubmit(e);

  } else{

          this.setState({
            idsi : tempId,
            offset : parseInt((this.state.idsi-1) *10)
        });
        console.log("id:", this.state.idsi ," offset", this.state.offset)
      this.onWordSubmit(e);


  }
      
      
  //console.log(this.state.offset)
}
  

onWordChange(e){

  
    this.setState({
        [e.target.name] : e.target.value
    });

    this.componentDidMount();
}
onWordSubmit(e){

    let tempArray = [];
    let tempName = [];
    let tempDispUrl_arr = [];
    let tempSnip_arr = [];
    let tempImg = [];

    
   
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
              'Postman-Token': '72654749-4fe5-4ad6-9af0-83e17067847d,6c739254-0fbd-4df5-b235-95b8bcb466bc',
              'Cache-Control': 'no-cache',
              Accept: '*/*',
              'User-Agent': 'PostmanRuntime/7.16.3',
              'Ocp-Apim-Subscription-Key': '1616861c0aea466ca23683fdeb513ca2' } };
            
            request(options, function (error, response, body) {
              
              if (error) throw new Error(error);
            
              if(!this.state.searchKey){
                  console.log("")
              } else {

                //console.log("ilk parse")

                let apiBody = JSON.parse(body);
                console.log(apiBody)

              let webLeng = apiBody.webPages.value.length;

              var contains = apiBody.webPages.value[4].displayUrl.includes("twitter")
              console.log(contains)

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

            
               

               console.log(!apiBody.images)
               if( !apiBody.images === true )
               {
                 console.log("yook")
               }else{
                for (let i = 0; i < apiBody.images.value.length; i++) {
                  let temp_img = apiBody.images.value[i].contentUrl;
                  tempImg.push(temp_img)
                  
                  
              } 
              var tempImgFor = "Images for " + this.state.searchKey;
              
              this.setState({tumImages : apiBody.images.webSearchUrl})
              this.setState({imagesFor : tempImgFor})
             

               }

             
/*
              for (let i = 0; i < imageLeng; i++) {
                    let temp_img = apiBody.images.value[i].contentUrl;
                    tempImg.push(temp_img)
                    
                } 
  */              this.setState({ contacts: tempArray})
                  this.setState({ web_name: tempName})
                  this.setState({ displayUrl: tempDispUrl_arr})
                  this.setState({ snippet: tempSnip_arr})
                  this.setState({pageClassName : ""})
                  this.setState({imagesUrl : tempImg})

                 
              }
              
                 
            }.bind(this));

    
    e.preventDefault();
}


  render() {


    const {searchKey} = this.state;
    //const {searchSuggestionsArray} = this.state;

    console.log(this.state.tumImages)
    
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
                        <div className = "form-group" >
                            
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
                        
                        <button type = "submit" className = "btn btn-danger" onClick={this.sayHello}>Search</button>

                    </form>
                    </div>
                    <Contacts
                        contacts={this.state.contacts}
                        web_name={this.state.web_name}
                        displayUrl={this.state.displayUrl}
                        snippet={this.state.snippet}
                        imagesUrl={this.state.imagesUrl}
                        tumImages={this.state.tumImages}
                        imagesFor={this.state.imagesFor}
                    />
                    
                    <div className={styles.pagination}>
                          
                          <span id={1} className={this.state.pageClassName} onClick={this.handleClick}>1</span>
                          <span id={2} className={this.state.pageClassName} onClick={this.handleClick}>2</span>
                          <span id={3} className={this.state.pageClassName} onClick={this.handleClick}>3</span>
                          <span id={4} className={this.state.pageClassName} onClick={this.handleClick}>4</span>
                    </div>
                    
        
      </div>
      
    )
  }
}


export default App;


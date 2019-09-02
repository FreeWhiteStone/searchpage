import React, { Component } from 'react'

class GetData extends Component {
        
        constructor(props) {
                super(props);
                this.state = {
                        list: ["1","2"],
                };
        console.log("alo4")
        }
       
      render() {
        //webPageArray
                let tempArray = [];
                
                var request = require("request");

                var options = { method: 'GET',
                  url: 'https://api.cognitive.microsoft.com/bing/v7.0/search',
                  qs: { q: 'Ozgur%Aktas' },
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
                
                  
                  let apiBody = JSON.parse(body);
                 
                  for (let i = 0; i < 10; i++) {
                        let tempPush = apiBody.webPages.value[i].url;
                        //var basTirnak ='"'
                        //basTirnak += tempPush + basTirnak;
                        tempArray.push(tempPush);
                        
                      } 
                      console.log(tempArray[0])
                      console.log("alo11")
                });
                console.log("alo2")
                //console.log(this.state.list)
        return (
            <div className="active-cyan-4 mb-4">
                    <input className="form-control" type="text" placeholder="Search" aria-label="Search"></input>
                    <div>
                
                            <ul>
                                        {console.log("alo3")}
                                        {this.state.list.map(item => (
                                        <li key={item}>{item}</li>
                                        ))}
                            </ul>
                    </div>
            </div>
                
        );
      }
}
export default GetData;
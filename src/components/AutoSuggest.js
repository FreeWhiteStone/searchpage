import React from 'react'

    const AutoSuggest = ({ suggestWord}) => {

      console.log(suggestWord)
      
      const item =[]

      for (let i = 0; i < suggestWord.length; i++) {
       
        item.push(
        <div className="container">
              <h6>{suggestWord[i]}</h6>
        </div>)
      }
    
      return (
        <div>
          
            {item}
          
        </div>
      )
    };

    export default AutoSuggest;
   
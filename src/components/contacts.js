import React from 'react'

    const Contacts = ({ contacts,web_name,displayUrl,snippet}) => {

      
      const item =[]

      for (let i = 0; i < contacts.length; i++) {
       
        item.push(
        <div className="container">
              <div className="card-body">
                            <a href={contacts[i]} >{web_name[i]}</a>
                            <p style={{ color: 'green' }}>{displayUrl[i]}</p>
                            <p>{snippet[i]}</p>
     
              </div>
        
        </div>)
      }
     
      return (
        <div>
          
            {item}
          
        </div>
      )
    };

    export default Contacts;
    /*
    <h6 className="card-subtitle mb-2 text-muted">{contacts}</h6>
                <p className="card-text">{contacts}</p>
                */
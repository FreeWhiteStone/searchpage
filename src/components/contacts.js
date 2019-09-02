import React from 'react'

    const Contacts = ({ contacts,detail }) => {
      return (
        <div>
          <center>
            
            
   
              {contacts.map(item => (
                <div className="card">
                    <div className="card-body">
                                        <h6 className="card-title"><a href={item}>{item}</a></h6>
                    </div>
                </div>
                                        ))}
          </center>
        </div>
      )
    };

    export default Contacts;
    /*
    <h6 className="card-subtitle mb-2 text-muted">{contacts}</h6>
                <p className="card-text">{contacts}</p>
                */
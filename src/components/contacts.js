import React from 'react'

    const Contacts = ({ contacts,web_name,displayUrl,snippet,imagesUrl,tumImages, imagesFor}) => {

      const images = []

     console.log(imagesFor)

      for (let i = 0; i < imagesUrl.length/4; i++) {
       
        images.push(
          
        <div className="container">
         
         <a href={imagesUrl[i]} ><img style={{ float:"left" }} src={imagesUrl[i]} width={120} height={100} mode='fit'alt="new"></img></a>
               

               
        </div>
        
        )
      }



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
            <div className="container" style={{ float: 'left' }}>
              
              <a href={tumImages} >{imagesFor}</a>
                
                  {images}
                
            </div>

            <div style={{ float: 'relative' }}>
              
                 {item}

            </div>
          
        </div>
      )
    };

    export default Contacts;
    /*
    <h6 className="card-subtitle mb-2 text-muted">{contacts}</h6>
                <p className="card-text">{contacts}</p>
                */
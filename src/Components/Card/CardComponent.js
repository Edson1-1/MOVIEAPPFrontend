import React from 'react';

import './CardComponent.css'


function CardComponent(props) {
  
  const renderCard = (info) => {
    return(
        <div className = "movie">
          <img src={'http://localhost:5000/'+info.img.substring(8)}/>
          <div className = "movie-info">
            <h3>{info.title}</h3>
          </div>
          <div className = "movie-description">
            <h2>Description</h2>
            <p>{info.description}</p>
          </div>
        </div>   
);

}
  const cardInfo = props.info;
  return(
    <div className= "movie-container">
      
      {cardInfo.map(renderCard)}
    
    </div>
   
  )
    
}

export default CardComponent;
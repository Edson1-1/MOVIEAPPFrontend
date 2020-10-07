import React from 'react';
import {Link} from "react-router-dom"

import './CardComponent.css'


function CardComponent(props) {
  
  const renderCard = (info) => {
    return(
      <Link to = {"/movie/"+info._id} className = "link-decoration">
        <div className = "movie"  >
          <img src={process.env.REACT_APP_IMGSRC+info.img.substring(8) || process.env.REACT_APP_DEFAULT_IMAGE} alt={info.title}/>
          <div className = "movie-info">
            <h3>{info.title}</h3>
          </div>
          <div className = "movie-description scrollbar-ripe-malinka ">
            <h2>Description</h2>
            <p>{info.description}</p>
          </div>
        </div>
        </Link>  );
        

}
  const cardInfo = props.info;
  return(
    <div className= "movie-container">
      
      {cardInfo.map(renderCard)}
    
    </div>
   
  )
    
}

export default CardComponent;
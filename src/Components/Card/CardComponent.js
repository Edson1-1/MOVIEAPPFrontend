import React from 'react';
import {Card} from 'react-bootstrap';


function CardComponent(props) {
  
  const renderCard = (info, index) => {
    return(
    <Card style={{ width: '18rem' }} key={index}>
  <Card.Img variant="top" src={'http://localhost:5000/'+info.img.substring(8)} />
  <Card.Body>
    <Card.Title>{info.title}</Card.Title>
    <Card.Text>
      {info.description}
    </Card.Text>
  </Card.Body>
</Card>)
}
  const cardInfo = props.info;
  return(
    
    <div>
      {cardInfo.map(renderCard)}
    </div>
  )
    
}

export default CardComponent;
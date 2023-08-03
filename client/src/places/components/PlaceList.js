import React from 'react'
import PlaceItem from './PlaceItem'
import Card from '../../shared/UIElements/Card'
import './PlaceList.css'

function PlaceList(props) {
   if(props.items === 0){
    return(
        <div className='place-list center'>
            <Card>
                <h2>No place found. Maybe create one?</h2>
                <button>Share place</button>
            </Card>
        </div>
    )
   }
  return (
    <ul className='place-list'>
        {props.items.map((place)=>{
            return <PlaceItem
              key={place.id}
              id={place.id} 
              image={place.imageUrl} 
              title={place.title} 
              description={place.description} 
              address={place.address} 
              creatorId={place.creator} 
              coordinate={place.location}
              />
        })}
    </ul>
  )
}

export default PlaceList
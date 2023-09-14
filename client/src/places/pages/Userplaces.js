import React from 'react'
import PlaceList from '../components/PlaceList'
import { useParams } from 'react-router-dom'

    const DUMMY_PLACES = [
        {
        id:'p1',
        title:'Empire state building',
        description:'one of the most famous sky scrappers in the world',
        imageUrl:'https://cdn.britannica.com/73/114973-050-2DC46083/Midtown-Manhattan-Empire-State-Building-New-York.jpg',
        address:'20 W 34th St., New York, NY 10001, United States',
        location:{
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'Empire state building',
        description:'one of the most famous sky scrappers in the world',
        imageUrl:'https://cdn.britannica.com/73/114973-050-2DC46083/Midtown-Manhattan-Empire-State-Building-New-York.jpg',
        address:'20 W 34th St., New York, NY 10001, United States',
        location:{
            lat: 40.7484405,
            lng: -73.9856644
        },
        creator:'u2'
    }
]
    const Userplaces = ()=>{
        const userId = useParams().userId;
        const loadedPlace = DUMMY_PLACES.filter(dummyPlace=> dummyPlace.creator === userId)

        return <PlaceList items={loadedPlace}/>
    }


export default Userplaces
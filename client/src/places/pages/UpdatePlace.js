import React from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css'
const DUMMY_PLACES = [{
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
}]
const UpdatePlace = ()=>{
    const placeId = useParams().placeId;
    const identifiedPlace = DUMMY_PLACES.find(p=> p.id === placeId)

    const[formState, inputHandler] = useForm({
        title:{
            value:identifiedPlace.title,
            isValid:true
        },
        description:{
            value:identifiedPlace.description,
            isValid:true
        }
    }, true)

    const placeUpdateSubmitHandler = (e)=>{
        e.preventDefault()
        console.log(formState.inputs);
    }
    if(!identifiedPlace){
        return (
        <div className='center'>Could not find place</div>
        )
    }
  return <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
        <Input 
            id='title' 
            element='input' 
            type='text' 
            lable='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title'
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
            />
        <Input 
            id='description' 
            element='textarea'  
            lable='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (min. 5 characters)'
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
        />
        <Button type='submit' disabled={!formState.isValid}>UPDATE PLACE</Button>
    </form>
    
  
}

export default UpdatePlace
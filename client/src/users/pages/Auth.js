import React from 'react'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import Card from '../../shared/UIElements/Card'
import './Auth.css'
function Auth() {
    const[formState, inputHandler]=useForm({
        email:{
            value:'',
            isValid:false
        },
        password:{
            value:'',
            isValid:false
        }
    },false)
    const authSubmitHandler = (e)=>{
        e.preventDefault()
        console.log(formState.inputs);
    }
  return (
    <Card className='authentication'>
        <h2>Login required</h2>
        <hr/>
        <form onSubmit={authSubmitHandler}>
            <Input
                id='email'
                element='input'
                type='email'
                label='Email'
                validators={[VALIDATOR_EMAIL()]}
                errorText='Please enter e valid email address'
                onInput={inputHandler}
            />
            <Input
                id='password'
                element='input'
                type='password'
                label='password'
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText='Password must contain 8 characters'
                onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>LOGIN</Button>
        </form>
    </Card>
  )
}

export default Auth
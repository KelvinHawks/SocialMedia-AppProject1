import React, {useState} from 'react'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_REQUIRE} from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import Card from '../../shared/UIElements/Card'
import './Auth.css'
function Auth() {
    const[isLoginMode, setIsLoginMode] = useState(true)
    const[formState, inputHandler, setFormData]=useForm({
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
    const switchModeHandler = ()=>{
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name:undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }else{
            setFormData({
                ...formState.inputs,
                name:{
                    value:'',
                    isValid:false
                }
            },false)
        }
        setIsLoginMode(prevMode=>!prevMode)
    }
  return (
    <Card className='authentication'>
        <h2>Login required</h2>
        <hr/>
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && 
            <Input
                id='name'
                element='input'
                type='text'
                label='Username'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Username required'
                onInput={inputHandler}
            />
            }
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
            <Button type='submit' disabled={!formState.isValid}>
                {isLoginMode ? 'LOGIN' : 'SIGNUP'}
            </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
    </Card>
  )
}

export default Auth
import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
//import { Navigate } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
// import { GenderCheckbox } from "./GenderCheckBox";
import "./Auth.css";

function Auth() {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // const [isChecked, setIsChecked] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const authSubmitHandler = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/users/login`,
          "POST",

          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "content-Type": "application/json" }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        //formData.append("gender", formState.inputs.gender);
        formData.append("image", formState.inputs.image.value);

        const responseData = await sendRequest(
          "http://127.0.0.1:5000/api/users/signup",
          "POST",
          formData,

          // JSON.stringify({
          //   name: formState.inputs.name.value,
          //   email: formState.inputs.email.value,
          //   password: formState.inputs.password.value,
          //   gender: formState.inputs.gender,
          // }),
          { "content-Type": "application/json" }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  const switchModeHandler = () => {
    // revisit by putting !
    if (isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  // const handleCheckboxChange = (gender) => {
  //    setIsChecked(!isChecked);
  //  setFormData({ ...formState.inputs, gender },isChecked);

  // };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Username"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Username required"
              onInput={inputHandler}
            />
          )}

          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter e valid email address"
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="Please provide an image"
            />
          )}
          <Input
            id="password"
            element="input"
            type="password"
            label="password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Password must contain 8 characters"
            onInput={inputHandler}
          />

          {/* {!isLoginMode && (
            <GenderCheckbox
              onCheckboxChange={handleCheckboxChange}
              selectedGender={formState.inputs.gender}
            
            />
          )} */}

          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
}

export default Auth;

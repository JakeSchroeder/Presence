import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import illustration_src from "../../../images/illustration.png";
import Icons from "../../icons";
import { Colors } from "../../../utils";
import useInput from "../../../hooks/useInput";
import axios from "axios";
import { setAuthToken } from "../../../utils";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../../../App";

const LoginWrapper = styled.div`
  /* @media (max-width: 1092px) {
    width: 290px;
  } */
  margin: 20px auto;
  max-width: 600px;
  width: 100%;
`;
const LoginLogo = styled.div`
  height: 49px;
  width: 49px;
  margin: 0 auto;
  & svg {
    width: 49px;
    height: 49px;
    /* fill: ${Colors.primary}; */
  }
`;

const LoginTitle = styled.h2`
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
`;

const LoginForm = styled.form``;

const InputWrapper = styled.div`
  padding: 10px 15px;
`;

const StyledLabel = styled.label`
  background: ${Colors.light};
  border-bottom: 2px solid rgb(101, 119, 134);
  display: flex;
  flex-direction: column;
`;

const StyledLabelText = styled.span`
  padding: 5px 10px;
  display: block;
`;
const StyledInput = styled.input`
  outline: 0;
  padding: 2px 10px 5px 10px;
  border: 0;
  background: ${Colors.light};
  font-size: 19px;
  color: ${Colors.title};
  width: 100%;
`;
const SignupWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Signup = styled(Link)`
  margin-top: 20px;
  text-align: center;
  color: ${Colors.primary};
  display: inline-flex;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledButtonWrapper = styled.div`
  margin: 10px;
`;

const StyledButton = styled.button`
  min-height: 50px;
  cursor: pointer;
  width: 100%;
  border-radius: 999px;

  border: 0;
  outline: 0;
  background: ${Colors.primary};
  color: white;
  font-size: 15px;
  font-family: inherit;
  font-weight: bold;

  &:hover {
    background: #eac428;
  }
`;

const Login = ({ history, setUser }) => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [email, emailInput] = useInput({ type: "email" });
  const [password, passwordInput] = useInput({ type: "password" });

  useEffect(() => {
    if (authState.isAuthenticated) {
      history.push("/explore");
    }
  }, [authState.isAuthenticated]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    axios
      .post("/api/user/login", userData)
      .then((res) => {
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <LoginWrapper>
      <LoginLogo>{Icons.presence}</LoginLogo>
      <LoginTitle>Log in to Presence</LoginTitle>
      <LoginForm onSubmit={(e) => handleFormSubmit(e)}>
        <InputWrapper>
          <StyledLabel>
            <StyledLabelText>Email</StyledLabelText>
            {emailInput}
          </StyledLabel>
        </InputWrapper>

        <InputWrapper>
          <StyledLabel>
            <StyledLabelText>Password</StyledLabelText>
            {passwordInput}
          </StyledLabel>
        </InputWrapper>
        <StyledButtonWrapper>
          <StyledButton>Log in</StyledButton>
        </StyledButtonWrapper>
        <SignupWrapper>
          <Signup to="/register">Sign up for Presence</Signup>
        </SignupWrapper>
      </LoginForm>
    </LoginWrapper>
  );
};

export default withRouter(Login);

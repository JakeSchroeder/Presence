import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import Icons from "../../icons";
import { Colors } from "../../../utils";
import axios from "axios";

const RegisterWrapper = styled.div`
  /* @media (max-width: 1092px) {
    width: 290px;
  } */
  margin: 20px auto;
  max-width: 600px;
  width: 100%;
`;

const RegisterLogo = styled.div`
  height: 49px;
  width: 49px;
  margin: 0 auto;
  & svg {
    width: 49px;
    height: 49px;
    /* fill: ${Colors.primary}; */
  }
`;

const RegisterTitle = styled.h2`
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
`;

const RegisterForm = styled.form``;

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

const ErrorMessage = styled.div``;

const Register = ({ history }) => {
  const [name, nameInput] = useInput({ type: "text" });
  const [email, emailInput] = useInput({ type: "email" });
  const [password, passwordInput] = useInput({ type: "password" });
  const [errors, setErrors] = useState({});
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post("/api/user/register", newUser)
      .then((res) => {
        history.push("/login");
      })
      .then((res) => {
        setErrors(res);
      })
      .catch((err) => {
        // console.log(errors);
      });
  };

  useEffect(() => {}, [errors]);

  return (
    <RegisterWrapper>
      <RegisterLogo>{Icons.presence}</RegisterLogo>
      <RegisterTitle>Sign up for Presence</RegisterTitle>

      <RegisterForm onSubmit={handleFormSubmit}>
        <InputWrapper>
          <StyledLabel>
            <StyledLabelText>Name</StyledLabelText>
            {nameInput}
          </StyledLabel>
          {!!errors.name ? errors.name : null}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel>
            <StyledLabelText>Email</StyledLabelText>
            {emailInput}
          </StyledLabel>
          {!!errors.email ? errors.email : null}
        </InputWrapper>
        <InputWrapper>
          <StyledLabel>
            <StyledLabelText>Password</StyledLabelText>
            {passwordInput}
          </StyledLabel>
          {!!errors.password ? errors.password : null}
        </InputWrapper>
        <StyledButtonWrapper>
          <StyledButton type="submit">Sign up</StyledButton>
        </StyledButtonWrapper>
        <SignupWrapper>
          <Signup to="/login">Have an account? Log in</Signup>
        </SignupWrapper>
      </RegisterForm>
    </RegisterWrapper>
  );
};

export default withRouter(Register);

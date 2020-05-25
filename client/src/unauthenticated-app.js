import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import illustration_src from "./images/illustration.png";
import Icons from "./components/icons";
import { Colors } from "./utils";
import { Spinner, ErrorMessage } from "./utils/elements";
import useInput from "./hooks/useInput";
import { useAuth } from "./context/authContext";
import { useAsync } from "./hooks/useAsync";

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

const StyledLoginForm = styled.form``;

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

  &:disabled {
    background: rgb(253, 233, 95);
    cursor: not-allowed;

    &:hover {
      background: rgb(253, 233, 95);
    }
  }

  &:hover {
    background: #eac428;
  }
`;

// const ErrorMessage = styled.p`
//   color: red;
//   margin: 0;
// `;

function LoginForm({ onSubmit }) {
  const [email, emailInput] = useInput({ type: "email", id: "email" });

  const [password, passwordInput] = useInput({
    type: "password",
    id: "password",
  });

  const { isLoading, isError, error, run } = useAsync();

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;
    run(
      onSubmit({
        email: email.value,
        password: password.value,
      })
    );
  }

  return (
    <LoginWrapper>
      <LoginLogo>{Icons.presence}</LoginLogo>
      <LoginTitle>Log in to Presence</LoginTitle>
      <StyledLoginForm onSubmit={handleSubmit}>
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
          <StyledButton type="submit" disabled={!email || !password}>
            {isLoading ? <Spinner width={32} height={32} /> : "Log in"}
          </StyledButton>
        </StyledButtonWrapper>
        <SignupWrapper>
          <Signup to="/">Having trouble Loggin in?</Signup>
        </SignupWrapper>
        {isError ? (
          <ErrorMessage css={{ textAlign: "center" }} error={error} />
        ) : null}
      </StyledLoginForm>
    </LoginWrapper>
  );
}

function UnauthenticatedApp() {
  const { login, register } = useAuth();
  return (
    <>
      <LoginForm onSubmit={login} />
    </>
  );
}

export default UnauthenticatedApp;

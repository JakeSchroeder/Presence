import React from 'react'
import styled from "styled-components";
import illustration_src from "../../../images/illustration.png";
import {Colors} from "../../../utils";
const LoginWrapper = styled.div`
border-radius: 16px;
  width: 350px;
    background: ${Colors.light};

    @media (max-width: 1092px) {
        width: 290px;
    }
`;


const LoginImg = styled.img``;

const LoginTitle = styled.h2``;

const LoginForm = styled.form`

`;

const InputWrapper = styled.div`
    background: ${Colors.light};
`;

const StyledLabel = styled.label``;
const StyledInput = styled.input``;
const ForgotPass = styled.p``;

const StyledButton = styled.button``;


const Login = () => {
    return (
        <LoginWrapper>
            <LoginImg src={illustration_src}/>
            <LoginTitle>
                See what’s happening in the world right now
            </LoginTitle>
            <LoginForm>
                <InputWrapper>
                    <StyledLabel>Phone, Email, or username</StyledLabel>
                    <StyledInput type="text"/>
                </InputWrapper>

                <InputWrapper>
                    <StyledLabel>Password</StyledLabel>
                    <StyledInput type="password"/>
                </InputWrapper>
            </LoginForm>
        </LoginWrapper>
    )
}

export default Login;

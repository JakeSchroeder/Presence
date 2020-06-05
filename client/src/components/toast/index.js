import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useModal from "../../hooks/useModal";
import { Colors } from "../../styles/colors";

const StyledToast = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  background: ${({ error }) => (error ? `${Colors.red}` : `${Colors.primary}`)};
  border-radius: 6px;
`;

const ToastMsg = styled.p`
  color: white;
  margin-right: 8px;
`;

const ToastLink = styled(Link)`
  /* text-transform: uppercase; */
  color: white;
`;

const Toast = ({ message, link, error }) => {
  return (
    <StyledToast error={error}>
      <ToastMsg>{message}</ToastMsg>
      <ToastLink to={link ? `${link}` : `/`}>View</ToastLink>
    </StyledToast>
  );
};

export default Toast;

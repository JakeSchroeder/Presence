import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useModal from "../../hooks/useModal";
import { Colors } from "../../styles/colors";

import Portal from "@reach/portal";

const ToastWrapper = styled.div`
  position: fixed;
  margin-bottom: 30px;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`;

const StyledToast = styled.div`
  padding: 10px;
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
  font-weight: bold;
  color: white;
`;

const Toast = ({ message, link, error }) => {
  return (
    <Portal>
      <ToastWrapper>
        <StyledToast error={error}>
          <ToastMsg>{message}</ToastMsg>
          <ToastLink to={link ? `${link}` : `/`}>View</ToastLink>
        </StyledToast>
      </ToastWrapper>
    </Portal>
  );
};

export default Toast;

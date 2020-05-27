import React from "react";
import styled from "styled-components";
import Icons from "../../icons";
import { Colors } from "../../../styles/colors";
import Search from "../../search";

const MessageModalWrapper = styled.div`
  border-radius: 15px;
  position: relative;
  z-index: 9999;
  display: flex;
  flex-direction: column;

  min-height: 400px;

  height: 650px;

  max-width: 80vw;

  max-height: 90vh;
  background: white;
  min-width: 600px;
`;

const MessageModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${Colors.border};
  padding: 5px 15px;
`;

const MessageTitle = styled.h2`
  margin: 10px;
`;

const MessageComment = styled.input`
  height: 38px;
  width: 100%;
  border-radius: 999px;
  font-size: 15px;
  background: #e6ecf0;
  border: 1px solid transparent;
  padding: 10px 10px 10px 50px;
  outline: none;
  color: ${Colors.body};

  &:focus {
    background: white;
    color: ${Colors.title};
    border-color: ${Colors.primary};
  }
`;

const MessageContent = styled.div`
  height: 100%;
`;

const MessageSend = styled.div`
  cursor: pointer;
  margin-left: 10px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:hover {
    background: ${Colors.hover};
  }
  & svg {
    fill: ${Colors.primary};
    width: 22.5px;
  }
`;

const MessageFooter = styled.div`
  border-top: 1px solid ${Colors.border};
  padding: 15px;
  display: flex;
`;

const SearchWrapperModal = styled.div`
  padding: 15px;
`;

const CloseBtn = styled.div`
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${Colors.hover};
  }
  & svg {
    fill: ${Colors.primary};
    width: 22.5px;
  }
`;

const NextButton = styled.button`
  outline: 0;
  min-height: 30px;
  padding: 0 15px;
  border-radius: 999px;
  font-size: 1rem;
  background: ${Colors.primary};
  border: 0;
  color: white;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const SendMessage = ({ closeModal }) => (
  <MessageModalWrapper>
    <MessageModalHeader>
      <TitleWrapper>
        <CloseBtn onClick={closeModal}>{Icons.close}</CloseBtn>
        <MessageTitle>Send Message</MessageTitle>
      </TitleWrapper>
    </MessageModalHeader>
    <MessageContent>
      <SearchWrapperModal>
        <Search placeHolderText="Serch people" />
      </SearchWrapperModal>
    </MessageContent>
    <MessageFooter>
      <MessageComment type="text" placeholder="Add a comment" />
      <MessageSend>{Icons.sendMessage}</MessageSend>
    </MessageFooter>
  </MessageModalWrapper>
);

export default SendMessage;

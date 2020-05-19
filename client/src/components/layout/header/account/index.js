import React, { useContext } from "react";
import styled from "styled-components";
import Icons from "../../../icons";
import { Colors, TweetBtn } from "../../../../utils";
import profile_src from "../../../../images/profile.png";
import { useDropdown } from "../../../../hooks/useDropdown";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../../../App";
const StyledAccountSwitcher = styled.div`
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  border-radius: 99px;

  padding: 10px;

  &:hover {
    background: ${Colors.hover};
  }
`;
const AccountInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const AccountImg = styled.img`
  border-radius: 999px;
  width: ${({ size }) => (size === "lg" ? `49px` : `39px`)};
  height: ${({ size }) => (size === "lg" ? `49px` : `39px`)};
  margin-right: 10px;
`;
const NameWrapper = styled.div`
  flex: 1;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-width: 0px;
  & > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const DisplayName = styled.p`
  font-weight: bold;
  color: ${Colors.title};
`;
const UserName = styled.p``;

const DropDownButton = styled.div`
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 0;
  width: 32px;
  height: 32px;
  & svg {
    width: 18.75px;
  }
`;

const AccountPopup = styled.div`
  border-radius: 14px;
  padding: 10px 0;
  border: 1px solid ${Colors.border};
  min-width: 260px;
  max-width: 325px;
  width: 300px;
  min-height: 30px;
  max-height: 480px;
  box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px,
    rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;
  position: relative;
  /* &::before {
    content: "";
    z-index: 0;
    transform: rotate(45deg);
    background: white;
    width: 16px;
    height: 8px;
    position: absolute;
    left: calc(50% - 8px);
    bottom: -4px;
    filter: drop-shadow(rgb(204, 214, 221) 1px -1px 1px);
    overflow: hidden;
  } */

  & svg {
    fill: white;
    max-width: 100%;
    height: 1.25em;
    width: 24px;
    position: absolute;
    left: calc(50% - 12px);
    transform: rotate(180deg);
    bottom: -11px;
    filter: drop-shadow(rgb(204, 214, 221) 1px -1px 1px);
  }
`;

const AccountHeader = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid ${Colors.border};
  display: flex;

  & svg {
    width: 18.75px;
  }
`;

const AccountList = styled.ul``;

const AccountItem = styled.li`
  cursor: pointer;
  padding: 15px;
  color: ${Colors.title};
  border-bottom: 1px solid ${Colors.border};
  &:hover {
    background: ${Colors.light};
  }

  &:last-child {
    border: 0;
  }
`;

const AccountVerify = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    width: 18.75px;
  }
`;

export const AccountInfo = ({ size, displayName, userName }) => (
  <AccountInfoWrapper>
    <AccountImg size={size} alt="User Pofile Image" src={profile_src} />
    <NameWrapper>
      <DisplayName>{displayName}</DisplayName>
      <UserName>@{userName}</UserName>
    </NameWrapper>
  </AccountInfoWrapper>
);

const AccountSwitcher = ({ history, displayName, userName }) => {
  const { dispatch } = useContext(AuthContext);

  const { toggleDropdown, isDropdownOpen, Dropdown } = useDropdown({
    openCenter: true,
    openTop: true,
  });

  return (
    <>
      {isDropdownOpen && (
        <Dropdown>
          <AccountPopup>
            <AccountHeader>
              <AccountInfo
                size="lg"
                displayName={displayName}
                userName={userName}
              />
              <span>{Icons.checkmark}</span>
            </AccountHeader>
            <AccountList>
              {/* <AccountItem>Add an existing account</AccountItem> */}
              <AccountItem
                onClick={() => {
                  dispatch({
                    type: "LOGOUT",
                  });
                  window.location.href = "/login";
                }}
              >
                Log out @{displayName}
              </AccountItem>
            </AccountList>
            {Icons.chevron}
          </AccountPopup>
        </Dropdown>
      )}
      <StyledAccountSwitcher
        onClick={(e) => {
          toggleDropdown(e);
        }}
      >
        <AccountInfo size="sm" displayName={displayName} userName={userName} />
        <DropDownButton>{Icons.dropDown}</DropDownButton>
      </StyledAccountSwitcher>
    </>
  );
};

export default withRouter(AccountSwitcher);

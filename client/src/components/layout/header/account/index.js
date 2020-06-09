import React, { useContext, useState, useRef, forwardRef } from "react";
import styled from "styled-components";
import Icons from "../../../icons";
import { Colors } from "../../../../styles/colors";
import { TweetBtn } from "../../../lib";
import profile_src from "../../../../images/profile.png";
import { useDropdown } from "../../../../hooks/useDropdown";
import { withRouter } from "react-router-dom";
import Popover, { ArrowContainer } from "react-tiny-popover";

const StyledAccountSwitcher = styled.div`
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  border-radius: 99px;

  padding: 10px;

  @media (max-width: 1280px) {
    flex-direction: column;
  }

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
  border-radius: 50%;
  width: ${({ size }) => (size === "lg" ? `49px` : `39px`)};
  height: ${({ size }) => (size === "lg" ? `49px` : `39px`)};
  margin-right: 10px;

  @media (max-width: 1280px) {
    margin-right: 0;
  }
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
  ${({ shouldHide }) =>
    shouldHide
      ? ` @media (max-width: 1280px) {
    display: none;
  }`
      : null}
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

  @media (max-width: 1280px) {
    display: none;
  }
`;

const AccountPopup = styled.div`
  background: white;
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
  /* position: relative; */

  /* & svg {
    fill: white;
    max-width: 100%;
    height: 1.25em;
    width: 24px;
    position: absolute;
    left: calc(50% - 12px);
    transform: rotate(180deg);
    bottom: -11px;
    filter: drop-shadow(rgb(204, 214, 221) 1px -1px 1px);
  } */
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

const StyledPopover = styled(Popover)`
  &.react-tiny-popover-container {
    border-radius: 14px;
  }
`;

const AccountImgWrapper = styled.div`
  width: 49px;
  height: 49px;
`;

// const StyledAccountSwitcherMobile = styled.div`
//  @media (max-width: 1280px) {
//     display: none;
//   }
// `;

export const AccountInfo = ({ size, displayName, userName }) => (
  <AccountInfoWrapper>
    <AccountImg size={size} alt="User Pofile Image" src={profile_src} />
    <NameWrapper>
      <DisplayName>{displayName}</DisplayName>
      <UserName>@{userName}</UserName>
    </NameWrapper>
  </AccountInfoWrapper>
);

const AccountImgSwitcher = forwardRef((props, ref) => (
  <AccountImgWrapper ref={ref} onClick={props.onClick}>
    {props.children}
  </AccountImgWrapper>
));

const AccountSwitcher = ({ displayName, userName, logout }) => {
  const { toggleDropdown, isDropdownOpen, Dropdown } = useDropdown({
    openCenter: true,
    openTop: true,
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // const ref = useRef();

  return (
    // <>
    //   {isDropdownOpen && (
    //     <Dropdown>
    //       <AccountPopup>
    //         <AccountHeader>
    //           <AccountInfo
    //             size="lg"
    //             displayName={displayName}
    //             userName={userName}
    //           />
    //           <span>{Icons.checkmark}</span>
    //         </AccountHeader>
    //         <AccountList>
    //           {/* <AccountItem>Add an existing account</AccountItem> */}
    //           <AccountItem
    //             onClick={() => {
    //               toggleDropdown();
    //               logout();
    //             }}
    //           >
    //             Log out @{displayName}
    //           </AccountItem>
    //         </AccountList>
    //         {Icons.chevron}
    //       </AccountPopup>
    //     </Dropdown>
    //   )}

    //   <StyledAccountSwitcher
    //     onClick={(e) => {
    //       toggleDropdown(e);
    //     }}
    //   >
    //     <AccountInfo size="sm" displayName={displayName} userName={userName} />
    //     <DropDownButton>{Icons.dropDown}</DropDownButton>
    //   </StyledAccountSwitcher>
    //   {/* <StyledAccountSwitcherMobile>
    //     <AccountImg size={size} alt="User Pofile Image" src={profile_src} />
    //   </StyledAccountSwitcherMobile> */}
    // </>

    <Popover
      isOpen={isPopoverOpen}
      position={"top"}
      align={"center"}
      onClickOutside={() => setIsPopoverOpen(false)}
      containerStyle={{ "border-radius": "14px" }}
      content={({ position, targetRect, popoverRect }) => (
        <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
          position={position}
          targetRect={targetRect}
          popoverRect={popoverRect}
          arrowColor={"white"}
          arrowSize={10}
          arrowStyle={{
            opacity: 1,
          }}
        >
          <AccountPopup>
            <AccountHeader>
              <AccountImg size="lg" alt="User Pofile Image" src={profile_src} />
              <NameWrapper>
                <DisplayName>{displayName}</DisplayName>
                <UserName>@{userName}</UserName>
              </NameWrapper>
              {/* <span>{Icons.checkmark}</span> */}
            </AccountHeader>
            <AccountList>
              {/* <AccountItem>Add an existing account</AccountItem> */}
              <AccountItem
                onClick={(e) => {
                  setIsPopoverOpen(false);
                  logout();
                }}
              >
                Log out @{displayName}
              </AccountItem>
            </AccountList>
          </AccountPopup>
        </ArrowContainer>
      )}
    >
      {(ref) => (
        <StyledAccountSwitcher
          ref={ref}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          size="sm"
        >
          <AccountImg size="sm" alt="User Pofile Image" src={profile_src} />
          <NameWrapper shouldHide>
            <DisplayName>{displayName}</DisplayName>
            <UserName>@{userName}</UserName>
          </NameWrapper>
          <DropDownButton>{Icons.dropDown}</DropDownButton>
        </StyledAccountSwitcher>
      )}
    </Popover>
  );
};

export default AccountSwitcher;

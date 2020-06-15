import React from "react";
import styled from "styled-components";
import { FollowBtn } from "../lib";
import Icons from "../../components/icons";
import { Colors } from "../../styles/colors";
import tb_src from "../../images/tb.jpg";
import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import "@reach/accordion/styles.css";

const FollowWrapper = styled.div`
  /* padding-top: 15px; */
  /* padding-top: 15px; */
  border-radius: 16px;
  /* width: 350px; */
  /* background: ${Colors.light};
  position: sticky;
  top: 0; */
  /* @media (max-width: 1092px) {
    width: 290px;
  } */
  background: ${Colors.light};
`;

const FollowHeader = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid ${Colors.border};
`;

const FollowTitle = styled.h2``;

const FollowBody = styled.div`
  width: 100%;
`;

const FollowList = styled.ul`
  width: 100%;
`;

const FollowItem = styled.li`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  max-width: 100%;
  border-bottom: 1px solid ${Colors.border};
  justify-content: space-between;
  /* &:last-child {
    border: 0;
} */
`;

const FollowImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FollowImage = styled.img`
  width: 50px;
  border-radius: 50%;
  display: block;
  margin-right: 15px;
`;

const FollowName = styled.p`
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
  margin-right: 16px;
`;

const FollowUsername = styled.p``;

const FollowFooter = styled.div`
  padding: 15px;
`;

const ShowMore = styled(Link)`
  color: ${Colors.primary};
`;

const StyledAccordion = styled(Accordion)``;

const StyledAccordionPanel = styled(AccordionPanel)`
  outline: 0;
  padding: 15px;
  border-bottom: 1px solid ${Colors.border};
`;

const StyledAccordionHeader = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid ${Colors.border};
`;

const HeaderText = styled.h4`
  font-size: 15px;
`;

const StyledAccordionButton = styled(AccordionButton)`
  background: none;
  border: 0;
  outline: 0;
  width: 100%;
  height: 100%;
  padding: 0;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  /* &:hover {
    background: ${Colors.hover};

    & svg {
      fill: ${Colors.primary};
    }
  }
  */
  & svg {
    fill: ${Colors.body};
    width: 18.75px;
    
  } 

  &:hover {
    
   
      background: ${Colors.hover};
    
    & svg {
      fill: ${Colors.primary};
    }
  }
`;

const AccordionList = styled.ul`
  margin-left: 15px;
`;

const AccordionListItem = styled.li`
  list-style: disc;
`;

function GroupedAccordionHeader({ children }) {
  return (
    <StyledAccordionButton>
      <StyledAccordionHeader>
        <HeaderText>{children}</HeaderText>

        <IconWrapper>{Icons.dropDown}</IconWrapper>
      </StyledAccordionHeader>
    </StyledAccordionButton>
  );
}

const WhoToFollow = () => {
  return (
    <FollowWrapper>
      <FollowHeader>
        <FollowTitle>XGIS Rules (FAQ)</FollowTitle>
      </FollowHeader>
      <FollowBody>
        <Accordion>
          <AccordionItem>
            <GroupedAccordionHeader>1. Keep it legal</GroupedAccordionHeader>
            <StyledAccordionPanel>
              <AccordionList>
                <AccordionListItem>
                  Discussion around the legality of issues is ok, encouraging or
                  aiding illegal activities is not.
                </AccordionListItem>
              </AccordionList>
            </StyledAccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <GroupedAccordionHeader>
              2. Sharing of personal data is forbidden
            </GroupedAccordionHeader>
            <StyledAccordionPanel>
              Sharing of personal data is forbidden - no doxxing or IP dumping
            </StyledAccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <GroupedAccordionHeader>3. No spam</GroupedAccordionHeader>
            <StyledAccordionPanel>
              Spam is strictly forbidden and will result in a ban. Professional
              promotion e.g. from fake companies is allowed within the confines
              of site-wide rules on self promotion, but will otherwise be
              considered spam.
            </StyledAccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <GroupedAccordionHeader>
              3. No reposting content
            </GroupedAccordionHeader>
            <StyledAccordionPanel>
              Sharing content on this site with all other 3rd party social media
              sites and or data dumping is forbidden.
            </StyledAccordionPanel>
          </AccordionItem>
        </Accordion>
      </FollowBody>
      <ShowMore to="#">
        <FollowFooter>Show more</FollowFooter>
      </ShowMore>
    </FollowWrapper>
  );
};

export default WhoToFollow;

import React from 'react'
import styled from "styled-components";
import {Colors, FollowBtn} from "../../utils";
import tb_src from "../../images/tb.jpg";
import { Link } from 'react-router-dom';

const FollowWrapper = styled.div`
border-radius: 16px;
  width: 350px;
    background: ${Colors.light};

    @media (max-width: 1092px) {
        width: 290px;
    }
`;

const FollowHeader = styled.div`
    padding: 10px 15px;
    border-bottom: 1px solid ${Colors.border};
`;

const FollowTitle = styled.h2``;

const FollowBody = styled.div`
width: 100%;`;

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

white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
font-weight: 700;
    margin-right: 16px;
`;

const FollowUsername = styled.p`

`;

const FollowFooter = styled.div`
    padding: 15px;
 
`;

const ShowMore = styled(Link)`
    color: ${Colors.primary};

  
`;

const WhoToFollow = () => {
    return (

        <FollowWrapper>
            <FollowHeader>
                <FollowTitle>Who to follow</FollowTitle>
            </FollowHeader>
            <FollowBody>
                <FollowList>
                    <FollowItem>
                        <FollowImageWrapper>
                        <FollowImage src={tb_src} alt="thing"/>
                        <div>
                            <FollowName>Fake Class Student</FollowName>
                            <FollowUsername>@random_User</FollowUsername>
                        </div>
                        </FollowImageWrapper>
                        <FollowBtn>Follow</FollowBtn>
                    </FollowItem>
                  
                </FollowList>
            </FollowBody>
            <ShowMore>
            <FollowFooter>
                Show more
            </FollowFooter>
            </ShowMore>
        </FollowWrapper>
    )
}

export default WhoToFollow;
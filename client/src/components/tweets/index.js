import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import Icons from "../icons";
import { Tweet } from "./tweet";

const TweetsWrapper = styled.div``;

const TweetList = ({ tweets, replying, parent }) => {
  // const { data, loading } = useFetch("data.json");
  // console.log(data);
  console.log(tweets);
  return (
    <TweetsWrapper>
      {tweets.map((t) => (
        <Tweet replying={replying} parent={parent} tweet={t} key={t._id} />
      ))}
    </TweetsWrapper>
  );
};

export default TweetList;

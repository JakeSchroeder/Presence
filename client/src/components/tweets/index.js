import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";
import Icons from "../icons";
import Tweet from "./tweet";

const simulatedFeedData = {
  tweets: [
    {
      _id: "546335",
      display_name: "Fake User",
      user_name: "@fakeUser1",
      img_src: "../../../img/profile.png",
      tweet_desc:
        "a big time rush comeback would simply put us one step closer to the ultimate goal: a bts x btr collab. after that: world domination.",
      date: "12:46PM Apr 20, 2020",
      replies: 12,
      likes: 2,
    },
    {
      _id: "546332",
      display_name: "Fake User 2",
      user_name: "@fakeUser2",
      img_src: "../../../img/profile.png",
      tweet_desc:
        "a big time rush comeback would simply put us one step closer to the ultimate goal: a bts x btr collab. after that: world domination.",
      date: "12:46PM Apr 20, 2020",
      replies: 0,
      likes: 9,
    },
  ],
};

const TweetsWrapper = styled.div``;

const TweetList = ({ tweets, loading }) => (
  <TweetsWrapper>
    {simulatedFeedData.tweets.map((t) => (
      <Tweet tweet={t} key={t._id} />
    ))}
  </TweetsWrapper>
);

export default TweetList;

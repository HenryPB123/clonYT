import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltTwoToneIcon from "@mui/icons-material/ThumbDownOffAltTwoTone";
import ReplyTwoToneIcon from "@mui/icons-material/ReplyTwoTone";
import AddTaskTwoToneIcon from "@mui/icons-material/AddTaskTwoTone";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchFailure, fetchSuccess } from "../redux/videoSlice";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  font-weight: 400;
  margin: 20px 0 10px 0;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recomendation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;

  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChannelDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: White;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

type Channel = {
  _id: string;
  name: string;
  email: string;
  img: string;
  subscribers: number;
  subscribersUsers: string[];
  createdAt: Date;
};

const Video = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentVideo = useSelector(
    (state: RootState) => state.video.currentVideo
  );
  const dispatch = useDispatch();

  const path = useLocation();
  const idVideo = path.pathname.split("/").pop();

  const [channel, setChannel] = useState<Channel | null>(null);
  console.log("channelllllllll", channel);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(
          `http://localhost:3000/api/videos/find/${idVideo}`
        );

        const channelRes = await axios.get(
          `http://localhost:3000/api/users/find/${videoRes.data.userId}`
        );
        console.log("channelisima", channelRes.data);

        setChannel(channelRes.data);

        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        dispatch(fetchFailure(error));
      }
    };
    fetchData();
  }, [idVideo, dispatch]);

  return (
    <Container>
      <Content>
        <Content>
          <VideoWrapper>
            <iframe
              width="100%"
              height="500px"
              src="https://www.youtube.com/embed/yIaXoop8gl4?si=4ke7i7_ZZO6N1uvI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </VideoWrapper>
          <Title>{currentVideo.title}</Title>
          <Details>
            <Info>
              {currentVideo.views} K visualizaciones{" "}
              {format(currentVideo.createdAt)}
            </Info>
            <Buttons>
              <Button>
                <ThumbUpOffAltIcon /> {currentVideo.likes?.lengt}
              </Button>
              <Button>
                <ThumbDownOffAltTwoToneIcon />
                Dislike
              </Button>
              <Button>
                <ReplyTwoToneIcon />
                Share
              </Button>
              <Button>
                <AddTaskTwoToneIcon />
                Save
              </Button>
            </Buttons>
          </Details>
          <Hr />
          <Channel>
            <ChannelInfo>
              <Image src={channel?.img} />

              <ChannelDetail>
                <ChannelName>{channel?.name}</ChannelName>
                <ChannelCounter>
                  {channel?.subscribers} Subscribers
                </ChannelCounter>
                <Description>{currentVideo.description}</Description>
              </ChannelDetail>
            </ChannelInfo>
            <Subscribe>Subscribe</Subscribe>
          </Channel>
          <Hr />
          <Comments />
        </Content>
      </Content>
      {/* <Recomendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recomendation> */}
    </Container>
  );
};

export default Video;

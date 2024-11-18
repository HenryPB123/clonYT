import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

// Crear interface con las props que mi componente necesita recibir de App
interface CardProps {
  type: string;
  video: {
    _id: string;
    userId: string;
    title: string;
    description: string;
    imgUrl: string;
    videoUrl: string;
    views: number;
    tags: string[];
    likes: string[];
    dislikes: string[];
    createdAt: string;
  };
}
interface ItemProp {
  type: string;
}
interface Channel {
  _id: string;
  name: string;
  email: string;
  subscribers: number;
  image: string;
}

const Container = styled.div.attrs<ItemProp>((props) => ({
  datatype: props.type,
}))`
  width: ${(props) => props["datatype"] !== "sm" && "360px"};
  margin-bottom: ${(props) => (props["datatype"] === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props["datatype"] === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img.attrs<ItemProp>((props) => ({
  datatype: props.type,
}))`
  width: 100%;
  height: ${(props) => (props["datatype"] === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div.attrs<ItemProp>((props) => ({
  datatype: props.type,
}))`
  display: flex;
  margin-top: ${(props) => props["datatype"] !== "sm" && "16px"};
  gap: 12px;
  align-items: center;
  flex: 1;
`;

const ChannelImage = styled.img.attrs<ItemProp>((props) => ({
  datatype: props.type,
}))`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  display: ${(props) => props["datatype"] === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  /* margin: 2px 0; */
`;
const Info = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card: React.FC<CardProps> = ({ type, video }) => {
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/users/find/${video.userId}`
      );
      setChannel(res.data);
      console.log("data", res.data);
    };

    fetchChannel();
  }, [video.userId]);
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel?.image} />

          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>
              {video.views} views - {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;

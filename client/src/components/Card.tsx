import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Crear interface con las props que mi componente necesita recibir de App
interface CardProps {
  type: string;
}

const Container = styled.div.attrs<CardProps>((props) => ({
  datatype: props.type,
}))`
  width: ${(props) => props["datatype"] !== "sm" && "360px"};
  margin-bottom: ${(props) => (props["datatype"] === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props["datatype"] === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img.attrs<CardProps>((props) => ({
  datatype: props.type,
}))`
  width: 100%;
  height: ${(props) => (props["datatype"] === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div.attrs<CardProps>((props) => ({
  datatype: props.type,
}))`
  display: flex;
  margin-top: ${(props) => props["datatype"] !== "sm" && "16px"};
  gap: 12px;
  align-items: center;
  flex: 1;
`;

const ChannelImage = styled.img.attrs<CardProps>((props) => ({
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

const Card: React.FC<CardProps> = ({ type }) => {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src="https://images.pexels.com/photos/20716648/pexels-photo-20716648/free-photo-of-telefono-inteligente-tecnologia-logo-pantalla-tactil.jpeg?auto=compress&cs=tinysrgb&w=800"
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src="https://images.pexels.com/photos/4480519/pexels-photo-4480519.jpeg?auto=compress&cs=tinysrgb&w=800"
          />

          <Texts>
            <Title>Name Video</Title>
            <ChannelName>Channel Name</ChannelName>
            <Info>660.625 views ° 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;

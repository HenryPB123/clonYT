import React from "react";
import styled from "styled-components";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltTwoToneIcon from "@mui/icons-material/ThumbDownOffAltTwoTone";
import ReplyTwoToneIcon from "@mui/icons-material/ReplyTwoTone";
import AddTaskTwoToneIcon from "@mui/icons-material/AddTaskTwoTone";

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

const Video = () => {
  return (
    <Container>
      <Content>
        <Content>
          <VideoWrapper>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/yIaXoop8gl4?si=4ke7i7_ZZO6N1uvI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </VideoWrapper>
          <Title>
            React Video Sharing App UI Design | Youtube UI Clone with React
          </Title>
          <Details>
            <Info>100 K visualizaciones hace 2 años</Info>
            <Buttons>
              <Button>
                <ThumbUpOffAltIcon /> 123
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
        </Content>
      </Content>
      <Recomendation>Recomendation</Recomendation>
    </Container>
  );
};

export default Video;

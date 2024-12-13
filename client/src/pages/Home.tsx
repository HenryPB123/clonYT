import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

interface HomeProps {
  type: string;
}

interface Video {
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
  createdAt: Date;
}

const Home: React.FC<HomeProps> = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`http://localhost:3000/api/videos/${type}`);
      setVideos(res.data);
      // console.log("data", res.data);
    };

    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos?.map((video: Video) => (
        <Card key={video._id} type="" video={video} />
      ))}
    </Container>
  );
};

export default Home;

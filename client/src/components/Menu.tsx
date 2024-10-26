import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  background-color: #202020;
  height: 100vh;
  color: white;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
`;
const Img = styled.img`
  height: 30px;
`;

const Menu = () => {
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Img src="https://static.vecteezy.com/system/resources/thumbnails/023/986/704/small_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png" />
          ClonTube
        </Logo>
      </Wrapper>
    </Container>
  );
};

export default Menu;

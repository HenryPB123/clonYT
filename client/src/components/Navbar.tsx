import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  padding: 0 10px;
  position: relative;
`;

const Search = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  border: 1px solid #ccc;
  border-radius: 50px;
  gap: 10px;
  color: ${({ theme }) => theme.textSoft};
`;

const Input = styled.input`
  width: 95%;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.textSoft};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 100;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7.5px;
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />

          <SearchOutlinedIcon />
        </Search>
        <Button>
          <AccountCircleOutlinedIcon />
          SIGN IN
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

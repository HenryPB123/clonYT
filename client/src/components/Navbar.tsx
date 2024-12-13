import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { VideoCallOutlined } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";

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
const ButtonOut = styled.button`
  padding: 5px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const Navbar = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión en Firebase
      dispatch(loginSuccess(null)); // Actualiza el estado en Redux
      console.log("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchOutlinedIcon />
        </Search>
        {currentUser ? (
          <User>
            <VideoCallOutlined />
            <Avatar src={currentUser.img} />
            {currentUser.name}
            <ButtonOut onClick={handleLogout}>
              <LogoutIcon />
              LOGOUT
            </ButtonOut>
          </User>
        ) : (
          <Link
            to="signin"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;

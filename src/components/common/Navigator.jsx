import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Navigator = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <HomeText onClick={() => navigate("/")}>Home</HomeText>
      <HomeAndMyProfile>
        <MyProfileText onClick={() => navigate("/")}>내 프로필</MyProfileText>
        <LogOutText onClick={() => navigate("/login")}>로그아웃</LogOutText>
      </HomeAndMyProfile>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  padding: 10px;
  background-color: gray;
  font-size: 20px;
`;

const HomeAndMyProfile = styled.div`
  display: flex;
`;

const HomeText = styled.p`
  justify-content: flex-start;
  cursor: pointer;
  &:hover {
    font-family: bold;
    color: yellow;
  }
`;

const MyProfileText = styled.p`
  justify-content: flex-end;
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    font-family: bold;
    color: yellow;
  }
`;

const LogOutText = styled.p`
  justify-content: flex-end;
  cursor: pointer;
  &:hover {
    font-family: bold;
    color: yellow;
  }
`;

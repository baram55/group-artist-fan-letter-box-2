import { Navigator } from "components/common/Navigator";
import React from "react";
import styled from "styled-components";
import defaultAvatar from "../assets/user.svg";

export const Profile = () => {
  return (
    <>
      <Navigator />
      <Background>
        <ProfileFrame>
          <Title>프로필 관리</Title>
          <Avatar src={defaultAvatar}></Avatar>
          <Nickname>닉네임</Nickname>
          <Id>아이디</Id>
          <EditButton>수정하기</EditButton>
        </ProfileFrame>
      </Background>
    </>
  );
};

const Background = styled.div`
  display: flex;
  background-color: white;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const ProfileFrame = styled.div`
  display: flex;
  width: 500px;
  height: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 15px;
  flex-direction: column;
  background-color: lightgray;
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 0 auto 0 auto;
`;

const Nickname = styled.p`
  font-size: 20px;
  margin: 10px auto 10px auto;
`;

const Id = styled.p`
  font-size: 20px;
  margin: 10px auto 10px auto;
`;

const EditButton = styled.button`
  background-color: black;
  font-size: 30px;
  color: white;
  width: 300px;
  height: 50px;
  margin: 10px auto 10px auto;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  margin: 10px auto 10px auto;
`;

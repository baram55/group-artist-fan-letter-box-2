import { Navigator } from "components/common/Navigator";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultAvatar from "../assets/user.svg";
import axios from "axios";
import { toast } from "react-toastify";

export const Profile = () => {
  const [id, setId] = useState();
  const [nickname, setNickname] = useState();
  const [avatar, setAvatar] = useState();

  const getUserInfo = async () => {
    let response;
    //const accessToken = localStorage.getItem("accessToken");
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InF3ZXIxIiwiaWF0IjoxNzA4NDU1OTI3LCJleHAiOjE3MDg0NTk1Mjd9.bmcIkMy-L9k_ujT0321mi1G1oRfBBN3EuhHVT0qhX0s";
    try {
      response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      toast.error(error.code);
    }

    const { id, nickname, avatar, success: isSuccess } = response.data;

    if (isSuccess) {
      setId(id);
      setNickname(nickname);
      setAvatar(avatar);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navigator />
      <Background>
        <ProfileFrame>
          <Title>프로필 관리</Title>
          <Avatar src={defaultAvatar}></Avatar>
          <Nickname>{nickname}</Nickname>
          <Id>{id}</Id>
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

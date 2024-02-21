import Avatar from "../components/common/Avatar";
import { Navigator } from "components/common/Navigator";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

export const Profile = () => {
  const [id, setId] = useState();
  const [nickname, setNickname] = useState();
  const [avatar, setAvatar] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editingNickname, setEditingNickname] = useState("");
  const fileInput = useRef(null);

  const getUserInfo = async () => {
    let response;
    const accessToken = localStorage.getItem("accessToken");
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

  const onEditHandler = () => {
    setEditingNickname("");
    setEditMode(true);
  };

  const onEditDoneHandler = async () => {
    let response;
    const accessToken = localStorage.getItem("accessToken");
    const formData = new FormData();

    if (!window.confirm("이대로 수정하시겠습니까?")) {
      return;
    }
    try {
      response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      toast.error(error.code);
      return;
    }

    const { success: isSuccess } = response.data;

    if (isSuccess) {
      try {
        formData.append("avatar", avatar);
        formData.append("nickname", editingNickname);
        response = await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/profile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } catch (error) {
        toast.error(error.code);
        return;
      }
    }

    const {
      avatar: receivedAvatar,
      nickname: receivedNickname,
      success,
    } = response.data;
    if (success) {
      localStorage.setItem("avatar", receivedAvatar);
      localStorage.setItem("nickname", receivedNickname);
      setNickname(editingNickname);
      setEditMode(false);
    }
  };

  const onCancelHandler = () => {
    setEditMode(false);
  };

  const onAvatarChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    } else {
      setAvatar(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navigator />
      <Background>
        <ProfileFrame>
          <AvatarInput
            type="file"
            accept="image/jpg,impge/png,image/jpeg"
            name="profileImg"
            onChange={(e) => onAvatarChange(e)}
            ref={fileInput}
          />
          <Title>프로필 관리</Title>
          <Avatar
            src={avatar}
            size="profile"
            onClick={() => fileInput.current.click()}
          ></Avatar>
          {editMode ? (
            <>
              <NicknameInput
                type="text"
                placeholder={nickname}
                minLength={1}
                maxLength={10}
                value={editingNickname}
                onChange={(e) => setEditingNickname(e.target.value)}
              />
            </>
          ) : (
            <Nickname>{nickname}</Nickname>
          )}
          <Id>{id}</Id>
          {editMode ? (
            <ButtonContainer>
              <CancelButton onClick={onCancelHandler}>취소</CancelButton>
              <EditDoneButton
                onClick={onEditDoneHandler}
                disabled={editingNickname === ""}
              >
                수정완료
              </EditDoneButton>
            </ButtonContainer>
          ) : (
            <EditButton onClick={onEditHandler}>수정하기</EditButton>
          )}
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

const AvatarInput = styled.input`
  display: none;
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 0 auto 0 auto;
`;

const Nickname = styled.p`
  font-size: 20px;
  margin: 10px auto 10px auto;
`;

const NicknameInput = styled.input`
  width: 200px;
  margin: 10px auto 10px auto;
  height: 30px;
`;

const Id = styled.p`
  font-size: 20px;
  margin: 10px auto 10px auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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

const CancelButton = styled.button`
  background-color: black;
  font-size: 30px;
  color: white;
  width: 150px;
  height: 50px;
  margin: 10px;
  cursor: pointer;
`;

const EditDoneButton = styled.button`
  background-color: black;
  font-size: 30px;
  color: white;
  width: 150px;
  height: 50px;
  margin: 10px;
  cursor: pointer;
`;

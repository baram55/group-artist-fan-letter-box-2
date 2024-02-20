import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn } from "redux/modules/auth";
import { toast } from "react-toastify";

export const LogIn = () => {
  const [isLogInMode, setIsLogInMode] = useState(true);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();

  const onLogInHandler = async (e) => {
    e.preventDefault();
    let response;

    try {
      response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
        id,
        password,
      });
    } catch (error) {
      toast.error(error.code); //NOTE - 에러 코드 처리하기
      return;
    }

    const {
      userId: receivedId,
      nickname: receivedNickname,
      avatar: receivedAvatar,
      success: isSuccess,
      accessToken,
    } = response.data;

    if (isSuccess) {
      dispatch(logIn());
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("id", receivedId);
      localStorage.setItem("nickname", receivedNickname);
      localStorage.setItem("avatar", receivedAvatar);
      toast.success("로그인에 성공하였습니다.");
      navigate("/");
      return;
    } else {
      toast.error("로그인에 실패했습니다.");
      return;
    }
  };

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/register`,
        { id, password, nickname }
      );
    } catch (error) {
      alert(error.code); //NOTE - 에러처리
      return;
    }
    const { success: isSuccess } = response.data;

    if (isSuccess) {
      toast.success("회가입이 완료되었습니다.");
      setId("");
      setPassword("");
      setNickname("");
      setIsLogInMode(true);
      return;
    } else {
      toast.error("회원가입에 실패했습니다.");
      return;
    }
  };
  return isLogInMode ? (
    <Background>
      <AccountForm>
        <Title>로그인</Title>
        <InputId
          type="text"
          minLength="4"
          maxLength="10"
          placeholder="아이디 (4~10글자)"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <InputPw
          type="password"
          minLength="4"
          maxLength="15"
          placeholder="비밀번호 (4~15글자)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LogInButton
          onClick={(e) => onLogInHandler(e)}
          disabled={id === "" || password === ""}
        >
          로그인
        </LogInButton>
        <RegisterLink
          onClick={() => {
            setIsLogInMode(false);
          }}
        >
          회원가입
        </RegisterLink>
      </AccountForm>
    </Background>
  ) : (
    <Background>
      <AccountForm>
        <Title>회원가입</Title>
        <InputId
          type="text"
          minLength="4"
          maxLength="10"
          placeholder="아이디 (4~10글자)"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <InputPw
          type="password"
          minLength="4"
          maxLength="15"
          placeholder="비밀번호 (4~15글자)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputNickname
          type="text"
          minLength="1"
          maxLength="10"
          placeholder="닉네임 (1~10글자)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <RegisterButton
          disabled={id === "" || password === "" || nickname === ""}
          onClick={(e) => onRegisterHandler(e)}
        >
          회원가입
        </RegisterButton>
        <LogInLink onClick={() => setIsLogInMode(true)}>로그인</LogInLink>
      </AccountForm>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  background-color: lightgray;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const AccountForm = styled.div`
  display: flex;
  width: 500px;
  height: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 15px;
  flex-direction: column;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 40px;
`;

const InputId = styled.input`
  height: 50px;
  margin-bottom: 20px;
`;

const InputPw = styled.input`
  height: 50px;
  margin-bottom: 20px;
`;

const InputNickname = styled.input`
  height: 50px;
  margin-bottom: 20px;
`;

const LogInButton = styled.button`
  background-color: lightgray;
  color: white;
  height: 100px;
  font-size: 30px;
  border-color: lightgray;
  cursor: pointer;
`;

const RegisterLink = styled.p`
  color: gray;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const RegisterButton = styled.button`
  background-color: lightgray;
  color: white;
  height: 100px;
  font-size: 30px;
  border-color: lightgray;
  cursor: pointer;
`;

const LogInLink = styled.p`
  color: lightgray;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

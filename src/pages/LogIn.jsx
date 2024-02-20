import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const LogIn = () => {
  const [isLogInMode, setIsLogInMode] = useState(true);
  const navigate = useNavigate();
  return isLogInMode ? (
    <BackGround>
      <LogInFrame>
        <Title>로그인</Title>
        <InputId
          type="text"
          minLength="4"
          maxLength="10"
          placeholder="아이디 (4~10글자)"
        />
        <InputPw
          type="password"
          minLength="4"
          maxLength="15"
          placeholder="비밀번호 (4~15글자)"
        />
        <LogInButton>로그인</LogInButton>
        <RegisterLink onClick={() => setIsLogInMode(false)}>
          회원가입
        </RegisterLink>
      </LogInFrame>
    </BackGround>
  ) : (
    <BackGround>
      <LogInFrame>
        <Title>회원가입</Title>
        <InputId
          type="text"
          minLength="4"
          maxLength="10"
          placeholder="아이디 (4~10글자)"
        />
        <InputPw
          type="password"
          minLength="4"
          maxLength="15"
          placeholder="비밀번호 (4~15글자)"
        />
        <InputNickname
          type="text"
          minLength="1"
          maxLength="10"
          placeholder="닉네임 (1~10글자)"
        />
        <LogInButton>회원가입</LogInButton>
        <RegisterLink onClick={() => setIsLogInMode(true)}>로그인</RegisterLink>
      </LogInFrame>
    </BackGround>
  );
};

const BackGround = styled.div`
  display: flex;
  background-color: lightgray;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LogInFrame = styled.div`
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

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const LogIn = () => {
  const navigate = useNavigate();
  return (
    <BackGround>
      <LogInFrame>
        <Title>로그인</Title>
        <InputId
          type="text"
          maxLength="10"
          placeholder="아이디 (4~10글자)"
        ></InputId>
        <InputPw
          type="password"
          maxLength="15"
          placeholder="비밀번호 (4~15글자)"
        ></InputPw>
        <LogInButton>로그인</LogInButton>
        <RegisterLink onClick={() => navigate("/register")}>
          회원가입
        </RegisterLink>
      </LogInFrame>
    </BackGround>
  );
};

const BackGround = styled.div`
  display: flex;
  background-color: gray;
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

const LogInButton = styled.button`
  background-color: gray;
  color: white;
  height: 100px;
  font-size: 30px;
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

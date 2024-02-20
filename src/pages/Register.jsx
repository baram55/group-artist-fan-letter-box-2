import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Register = () => {
  const navigate = useNavigate();
  return (
    <BackGround>
      <RegisterFrame>
        <Title>회원가입</Title>
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
        <InputNickname
          type="text"
          maxLength="10"
          placeholder="닉네임 (1~10글자)"
        ></InputNickname>
        <RegisterButton>회원가입</RegisterButton>
        <LogInLink onClick={() => navigate("/log_in")}>로그인</LogInLink>
      </RegisterFrame>
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

const RegisterFrame = styled.div`
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

const RegisterButton = styled.button`
  background-color: gray;
  color: white;
  height: 100px;
  font-size: 30px;
  cursor: pointer;
`;

const LogInLink = styled.p`
  color: gray;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Button from "./common/Button";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddForm() {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [member, setMember] = useState("카리나");

  useEffect(() => {
    const localNickname = localStorage.getItem("nickname");
    setNickname(localNickname);
  }, []);

  const onAddLetter = async (event) => {
    event.preventDefault();

    let response;

    if (content === "") return toast.warning("내용은 필수값입니다.");

    const newLetter = {
      id: uuid(),
      nickname: localStorage.getItem("nickname"),
      content,
      avatar: localStorage.getItem("avatar"),
      writedTo: member,
      createdAt: new Date(),
    };

    const accessToken = localStorage.getItem("accessToken");

    try {
      response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      toast.error(error.code); //NOTE - 에러 처리
    }
    const { success: isSuccess } = response.data;

    if (isSuccess) {
      try {
        await axios.post("http://localhost:5000/letters", newLetter);
      } catch (error) {
        toast.error(error.code); //NOTE - 에러처리
        return;
      }
      setContent("");
    }
  };

  return (
    <Form onSubmit={onAddLetter}>
      <InputWrapper>
        <label>닉네임:</label>
        <Nickname>{nickname}</Nickname>
      </InputWrapper>
      <InputWrapper>
        <label>내용:</label>
        <textarea
          placeholder="최대 100글자까지 작성할 수 있습니다."
          maxLength={100}
          onChange={(event) => setContent(event.target.value)}
          value={content}
        />
      </InputWrapper>
      <SelectWrapper>
        <label>누구에게 보내실 건가요?</label>
        <select onChange={(event) => setMember(event.target.value)}>
          <option>카리나</option>
          <option>윈터</option>
          <option>닝닝</option>
          <option>지젤</option>
        </select>
      </SelectWrapper>
      <Button text="팬레터 등록" />
    </Form>
  );
}

const Form = styled.form`
  background-color: gray;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 500px;
  border-radius: 12px;
  margin: 20px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  & label {
    width: 80px;
  }
  & input,
  textarea {
    width: 100%;
    padding: 12px;
  }
  & textarea {
    resize: none;
    height: 80px;
  }
`;

const Nickname = styled.p`
  color: white;
  float: left;
`;

const SelectWrapper = styled(InputWrapper)`
  justify-content: flex-start;
  & label {
    width: 170px;
  }
`;

import Avatar from "components/common/Avatar";
import Button from "components/common/Button";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getFormattedDate } from "util/date";
import axios from "axios";
import { toast } from "react-toastify";

export default function Detail() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [letter, setLetter] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const onDeleteBtn = async () => {
    const answer = window.confirm("정말로 삭제하시겠습니까?");
    if (!answer) return;

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
      return;
    }

    const { success: isSuccess } = response.data;

    if (isSuccess) {
      try {
        response = await axios.delete(`http://localhost:5000/letters/${id}`);
      } catch (error) {
        toast.error(error.code);
        return;
      }
      navigate("/");
    }
  };
  const onEditDone = async () => {
    if (!editingText) return alert("수정사항이 없습니다.");

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
      return;
    }

    const { success: isSuccess } = response.data;

    if (isSuccess) {
      try {
        await axios.patch(`http://localhost:5000/letters/${id}`, {
          content: editingText,
        });
      } catch (error) {
        toast.error(error.code);
        return;
      }
    }
    setLetter((prev) => ({ ...prev, content: editingText }));
    setIsEditing(false);
    setEditingText("");
  };

  useEffect(() => {
    const getLetters = async () => {
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
        return;
      }

      const { success: isSuccess } = response.data;

      if (isSuccess) {
        try {
          response = await axios.get("http://localhost:5000/letters");
        } catch (error) {
          toast.error(error.code);
          return;
        }
        const receivedLetters = response.data;
        setLetter(receivedLetters.find((letter) => letter.id === id));
      }
    };
    getLetters();
  }, []);

  return (
    <Container>
      <Link to="/">
        <HomeBtn>
          <Button text="홈으로" />
        </HomeBtn>
      </Link>

      <DetailWrapper>
        <UserInfo>
          <AvatarAndNickname>
            <Avatar src={letter.avatar} size="large" />
            <Nickname>{letter.nickname}</Nickname>
          </AvatarAndNickname>
          <time>{getFormattedDate(letter.createdAt)}</time>
        </UserInfo>
        <ToMember>To: {letter.writedTo}</ToMember>
        {isEditing ? (
          <>
            <Textarea
              autoFocus
              defaultValue={letter.content}
              onChange={(event) => setEditingText(event.target.value)}
            />
            <BtnsWrapper>
              <Button text="취소" onClick={() => setIsEditing(false)} />
              <Button text="수정완료" onClick={onEditDone} />
            </BtnsWrapper>
          </>
        ) : (
          <>
            <Content>{letter.content}</Content>
            <BtnsWrapper>
              <Button
                disabled={letter.userId !== localStorage.getItem("id")}
                text="수정"
                onClick={() => setIsEditing(true)}
              />
              <Button
                disabled={letter.userId !== localStorage.getItem("id")}
                text="삭제"
                onClick={onDeleteBtn}
              />
            </BtnsWrapper>
          </>
        )}
      </DetailWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const HomeBtn = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const DetailWrapper = styled.section`
  background-color: gray;
  color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 700px;
  min-height: 400px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AvatarAndNickname = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Nickname = styled.span`
  font-size: 32px;
`;

const ToMember = styled.span`
  font-size: 24px;
`;

const Content = styled.p`
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  background-color: black;
  border-radius: 12px;
  height: 200px;
`;

const BtnsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Textarea = styled.textarea`
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  background-color: black;
  border-radius: 12px;
  height: 200px;
  resize: none;
  color: white;
`;

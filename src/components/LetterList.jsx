import styled from "styled-components";
import { useSelector } from "react-redux";
import LetterCard from "./LetterCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LetterList({ refresh }) {
  const activeMember = useSelector((state) => state.member);
  const [letters, setLetters] = useState([]);

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
          response = await axios.get(
            "http://localhost:5000/letters?_sort=-createdAt"
          );
        } catch (error) {
          toast.error(error.code);
          return;
        }
        const currentAvatar = localStorage.getItem("avatar");
        const userId = localStorage.getItem("id");
        setLetters(
          response.data.map((letter) => {
            if (letter.userId === userId) {
              return { ...letter, avatar: currentAvatar };
            }
            return letter;
          })
        );
      }
    };
    getLetters();
  }, [refresh]); //NOTE - 이렇게하는게 맞나요?

  const filteredLetters = letters.filter(
    (letter) => letter.writedTo === activeMember
  );

  return (
    <ListWrapper>
      {filteredLetters.length === 0 ? (
        <p>
          {activeMember}에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이
          되보세요!
        </p>
      ) : (
        filteredLetters.map((letter) => (
          <LetterCard key={letter.id} letter={letter} />
        ))
      )}
    </ListWrapper>
  );
}

const ListWrapper = styled.ul`
  background-color: black;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  border-radius: 12px;
  padding: 12px;
  color: white;
`;

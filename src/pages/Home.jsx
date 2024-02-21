import AddForm from "components/AddForm";
import Header from "components/Header";
import LetterList from "components/LetterList";
import { useState } from "react";
import styled from "styled-components";
//NOTE - outlet 구현
export default function Home() {
  const [refresh, setRefresh] = useState(false);
  return (
    <Container>
      <Header />
      <AddForm setRefresh={setRefresh} />
      <LetterList refresh={refresh} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

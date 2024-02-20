import AddForm from "components/AddForm";
import Header from "components/Header";
import LetterList from "components/LetterList";
import styled from "styled-components";
//NOTE - outlet 구현
export default function Home() {
  return (
    <Container>
      <Header />
      <AddForm />
      <LetterList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

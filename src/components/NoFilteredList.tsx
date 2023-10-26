import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  color: var(--Black-80);

  h3 {
    font-size: 20px;
  }

  img {
    width: 24px;
  }
  .req {
    width: 32px;
  }

  div {
    letter-spacing: -0.56px;
  }
`;

export default function NoFilteredList() {
  return (
    <Container>
      <img src="/img/icon_search.svg" alt="icon_search" />
      <h3>검색된 기사가 없습니다</h3>
      <div>필터를 다시 설정해 보세요</div>
    </Container>
  );
}

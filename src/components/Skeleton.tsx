import { styled } from "styled-components";

const Container = styled.div`
  height: 116px;
  border-radius: 8px;

  animation: skeleton 1.5s infinite ease-in-out;
  border-radius: 10px;

  @keyframes skeleton {
    0% {
      background-color: rgba(115, 115, 115, 0.2);
    }
    50% {
      background-color: rgba(115, 115, 115, 0.5);
    }
    100% {
      background-color: rgba(115, 115, 115, 0.2);
    }
  }
`;

export default function Skeleton() {
  return <Container></Container>;
}

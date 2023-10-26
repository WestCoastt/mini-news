import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 295px;
  height: 60px;

  border-radius: 16px;
  background: var(--Blue---Main);

  color: var(--White-100);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.8px;
`;

export default function Button(props: { content: string }) {
  return <Container>{props.content}</Container>;
}

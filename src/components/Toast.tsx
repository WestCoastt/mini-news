import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useToastStore } from "../store/store";

const Container = styled.div`
  position: absolute;

  bottom: 96px;
  left: 0;
  width: 100%;
  padding: 0 10px;

  a {
    text-decoration: none;
  }

  .box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 16px;
    animation: slider 0.3s;

    font-weight: 500;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;

    div {
      width: fit-content;
      display: flex;
      gap: 6px;

      img {
        width: 18px;
        height: 18px;
      }
    }
    .btn {
      color: #3dd326;
    }
  }

  @keyframes slider {
    0% {
      transform: translateY(50%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default function Toast(props: { toast: string }) {
  const { setToast } = useToastStore();

  return (
    <Container>
      <div className="box">
        {props.toast === "스크랩" ? (
          <div>
            <img src="/img/icon_check.svg" alt="check" />
            <span>이 기사를 스크랩했어요</span>
          </div>
        ) : (
          <div>
            <span>스크랩을 해제했어요</span>
          </div>
        )}
        <Link
          to="/scrap"
          onClick={() => {
            setToast("");
          }}
        >
          {props.toast === "스크랩" && (
            <div className="btn">스크랩한 기사보기</div>
          )}
        </Link>
      </div>
    </Container>
  );
}

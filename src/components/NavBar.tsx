import { styled } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Toast from "./Toast";
import { useToastStore } from "../store/store";
import { useEffect } from "react";

const Container = styled.div`
  position: fixed;
  z-index: 11;
  bottom: 0;
  max-width: 560px;
  width: 100%;
  height: 85px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background: var(--Black-100);
  display: flex;
  justify-content: center;

  padding: 20px 80px;

  .wrapper {
    width: 100%;
    max-width: 320px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a {
    text-decoration: none;
  }

  .btn {
    width: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;

    div {
      color: var(--White-100);
      font-size: 10px;
      font-weight: 600;
      text-align: center;
      line-height: 12px;
      text-transform: uppercase;
      letter-spacing: -0.9px;
    }
  }
  .empty {
    div {
      color: var(--Black-80, #6d6d6d);
    }
  }
`;

export default function NavBar() {
  const scrap_page = useLocation().pathname.includes("scrap");
  const { toast, setToast } = useToastStore();

  useEffect(() => {
    if (!toast) return;

    const toastTimer = setTimeout(() => {
      setToast("");
    }, 2000);

    return () => {
      clearTimeout(toastTimer);
    };
  }, [toast]);

  return (
    <Container>
      {toast !== "" && <Toast toast={toast} />}

      <div className="wrapper">
        <Link to="/">
          <div className={"btn" + (scrap_page ? " empty" : "")}>
            <img
              src={`/img/icon_home${scrap_page ? "_empty" : ""}.svg`}
              alt="home"
            />
            <div>홈</div>
          </div>
        </Link>

        <Link to="scrap">
          <div className={"btn" + (scrap_page ? "" : " empty")}>
            <img
              src={`/img/icon_sheet${scrap_page ? "" : "_empty"}.svg`}
              alt="home"
            />
            <div>스크랩</div>
          </div>
        </Link>
      </div>
    </Container>
  );
}

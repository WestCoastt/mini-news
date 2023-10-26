import { styled } from "styled-components";
import Topbar from "../components/Topbar";
import Card from "../components/Card";
import Button from "../components/Button";
import { useScrapStore } from "../store/store";
import { News } from "./Home";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div<{ $pb: boolean }>`
  min-height: 100vh;

  .card_container {
    width: 100%;
    padding: 20px;
    padding-top: 88px;
    padding-bottom: 100px;

    display: inline-flex;
    flex-direction: column;
    gap: 12px;
  }

  a {
    text-decoration: none;
  }
`;

const NoList = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .box {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .no_scrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;

      color: var(--Black-80);
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
      letter-spacing: -0.9px;

      img {
        width: 36px;
        height: 36px;
      }
    }
  }
`;

export default function Scrap() {
  const search = useLocation().pathname.includes("search");
  const { scrap } = useScrapStore();

  return (
    <Container $pb={search}>
      {scrap.length > 0 ? (
        <div>
          <Topbar />
          <div className="card_container">
            {scrap.map((item: News) => (
              <Link key={item.url} to={item.url}>
                <Card key={item.url} data={item} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <NoList>
          <div className="box">
            <div className="no_scrap">
              <img src="/img/icon_file-text.svg" alt="file" />
              저장된 스크랩이 없습니다.
            </div>
            <Link to="/">
              <Button content="스크랩 하러 가기" />
            </Link>
          </div>
        </NoList>
      )}
    </Container>
  );
}

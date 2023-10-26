import { styled } from "styled-components";
import { News } from "../pages/Home";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FormEvent } from "react";
import { useScrapStore, useToastStore } from "../store/store";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  height: 116px;
  padding: 16px 20px;
  border-radius: 8px;
  background: var(--White-90);

  .img_box {
    width: 84px;
    height: 84px;

    img {
      width: 84px;
      height: 84px;
      object-fit: cover;
      border-radius: 4px;
    }
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  max-height: 56px;
  gap: 11px;

  h3 {
    margin: 0;
    width: 100%;
    height: 100%;

    overflow: hidden;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    color: var(--Black-100, #000);
    font-size: 16px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.9px;
  }
`;

const Footer = styled.div`
  display: flex;
  width: 108px;
  justify-content: space-between;
  align-items: center;

  .date {
    color: var(--Black-80);
    font-size: 14px;
    letter-spacing: -0.65px;
    min-width: 74px;
  }

  img {
    width: 20px;
  }
`;

export default function Card(item: { data: News }) {
  const scrap_page = useLocation().pathname.includes("scrap");
  const { scrap, addArticle, deleteArticle } = useScrapStore();
  const { setToast } = useToastStore();
  const hasItem = scrap.findIndex((el) => el.url === item.data.url) !== -1;

  const handleItem = (e: FormEvent) => {
    e.preventDefault();

    if (hasItem) {
      deleteArticle(item.data.url);
      setToast("해제");
    }

    if (!scrap_page) {
      if (!hasItem) {
        addArticle(item.data);
        setToast("스크랩");
      }
    }
  };

  return (
    <Container>
      <Contents>
        <Title>
          <h3>{item.data.title}</h3>
        </Title>
        <Footer>
          <img
            src={`/img/icon_bookmark${hasItem ? "_green" : ""}.svg`}
            alt="icon_bookmark"
            onClick={handleItem}
          />
          <div className="date">
            {format(
              new Date(item.data.publishedAt.split("T")[0]),
              "yyyy.MM.dd (EEE)",
              {
                locale: ko,
              }
            )}
          </div>
        </Footer>
      </Contents>
      {item.data.urlToImage && (
        <div className="img_box">
          <img src={item.data.urlToImage} alt="headline" />
        </div>
      )}
    </Container>
  );
}

import styled from "styled-components";
import { useCategory } from "../store/store";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div`
  position: fixed;
  top: 0;
  max-width: 560px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 20px 12px 20px;

  background: var(--White-100);

  .back {
    display: flex;
    align-items: center;
    gap: 8px;

    a {
      height: 30px;
    }

    .left {
      width: 30px;
    }
  }
`;

const Input = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  border: 2px solid var(--Black-100);
  border-radius: 30px;
  overflow: hidden;
  padding: 10px 16px;

  input {
    font-size: 16px;
    border: none;
    outline: none;
  }
  input::placeholder {
    font-size: 14px;
  }
`;

export const Slider = styled.div`
  display: inline-block;
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }

  div {
    display: inline-flex;
    width: fit-content;
    min-width: 60px;
    margin: 0 2px;
    padding: 6px 12px 4px 12px;
    justify-content: center;
    align-items: center;
    gap: 4px;

    border-radius: 30px;
    border: 1px solid var(--Gray);

    color: var(--Black-80);
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.56px;
  }
  .selected {
    color: var(--Blue---Main);
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.56px;
    border: 1px solid var(--Sub---BlueSky);
  }

  .no_list {
    color: var(--Black-80);
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.56px;
  }
`;

const categories = [
  { param: "general", name: "전체" },
  { param: "business", name: "비즈니스" },
  { param: "entertainment", name: "엔터테인먼트" },
  { param: "health", name: "건강" },
  { param: "science", name: "과학" },
  { param: "sports", name: "스포츠" },
  { param: "technology", name: "테크" },
];

interface Category {
  param: string;
  name: string;
}

export default function Topbar() {
  const scrap = useLocation().pathname.includes("scrap");
  const search = useLocation().pathname.includes("search");
  const navigate = useNavigate();
  const { category, setCategory } = useCategory();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const handleClick = (param: string) => {
    navigate("/");
    setCategory(param);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (keyword) setCategory("");
  }, [keyword]);

  return (
    <Container>
      <div className="back">
        {search && (
          <Link to="/">
            <img className="left" src="/img/icon_arrow-left.svg" alt="back" />
          </Link>
        )}
        <Input>
          <img src="/img/icon_search.svg" alt="search" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            onClick={() => {
              navigate("/search");
            }}
            readOnly
            value={keyword ? keyword : ""}
          />
        </Input>
      </div>
      {!search && !scrap && (
        <Slider>
          {categories.map((item: Category) => (
            <div
              key={item.param}
              className={category === item.param ? "selected" : ""}
              onClick={() => handleClick(item.param)}
            >
              {item.name}
            </div>
          ))}
        </Slider>
      )}
    </Container>
  );
}

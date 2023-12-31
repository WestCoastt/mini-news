import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useKeywordStore } from "../store/store";
import { format, subDays } from "date-fns";

const Container = styled.div`
  min-height: 100vh;
  background: #fff;

  animation: slider 0.3s;

  @keyframes slider {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .top {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;

    a {
      height: 30px;
    }

    .left {
      width: 30px;
    }
  }

  .dot {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 20px;

    img {
      width: 24px;
    }

    .delete {
      position: absolute;
      z-index: 2;
      padding: 16px 28px;
      border-radius: 6px;
      right: 8px;
      top: 36px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);
      background: var(--White-100);
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

const RecentSearch = styled.div`
  position: relative;
  height: 36px;
`;

const KeywordList = styled.div`
  position: absolute;
  width: 100%;
  max-width: 560px;
  overflow-x: scroll;
  padding-left: 16px;

  &::-webkit-scrollbar {
    display: none;
  }

  .container {
    display: flex;
    flex-wrap: nowrap;

    div {
      flex: 0 0 auto;
      width: fit-content;
      margin: 0 2px;
      padding: 6px 12px 4px 12px;

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
  }
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 16px;

  h3 {
    font-size: 16px;
    margin: 12px 0;
  }

  .period {
    display: flex;
    flex-wrap: wrap;
    padding-left: 12px;
    gap: 5px;

    padding-left: 0;
    font-size: 13px;
    color: var(--Black-80);

    div {
      display: flex;
      align-items: center;
      padding: 6px 10px;

      border-radius: 30px;
      border: 1px solid var(--Gray);
    }
    .sort,
    .date {
      color: var(--White-100);
      background: var(--Blue---Main);
      border: 1px solid var(--Blue---Main);
    }
  }
`;

const sort_list = [
  {
    value: "relevancy",
    name: "관련도순",
  },
  {
    value: "popularity",
    name: "인기순",
  },
  {
    value: "publishedAt",
    name: "최신순",
  },
];

const date_list = [
  { value: 0, name: "전체" },
  { value: 1, name: "1일" },
  { value: 7, name: "1주" },
  { value: 30, name: "1개월" },
];

export default function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("relevancy");
  const [date, setDate] = useState("전체");
  const [calendar, setCalendar] = useState({
    from: "",
    to: "",
  });
  const { list, setList, currentClicked, deleteList } = useKeywordStore();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLImageElement>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const search = (keyword: string) => {
    window.scrollTo(0, 0);
    currentClicked(keyword);
    navigate(
      `/q?keyword=${keyword}&sortBy=${sort}${
        calendar.from && calendar.to
          ? `&from=${calendar.from}&to=${calendar.to}`
          : ""
      }`
    );
    setList(keyword);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!keyword) return alert("검색어를 입력해 주세요.");
      search(keyword);
    }
  };

  const handleCurrentKeyword = (item: string) => {
    search(item);
  };

  const handleDate = (item: { value: number; name: string }) => {
    setDate(item.name);
    if (item.value === 0) return;
    const today = new Date();
    const subDay = subDays(today, item.value);
    setCalendar({
      from: format(subDay, "yyyy-MM-dd"),
      to: format(today, "yyyy-MM-dd"),
    });
  };

  const handleDelete = () => {
    deleteList();
  };

  const clickOutside = (e: any) => {
    menuRef.current !== e.target && setMenu(false);
  };

  useEffect(() => {
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, []);

  return (
    <Container>
      <div className="top">
        <img
          className="left"
          src="/img/icon_arrow-left.svg"
          alt="back"
          onClick={() => navigate(-1)}
        />

        <Input>
          <img src="/img/icon_search.svg" alt="search" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            onChange={handleInput}
            onKeyDown={onKeyDown}
          />
        </Input>
      </div>

      <div className="dot">
        <span>최근 검색어</span>
        <img
          ref={menuRef}
          src="/img/icon_dot-menu.svg"
          alt="menu"
          onClick={() => setMenu(!menu)}
        />
        {menu && (
          <span className="delete" onClick={handleDelete}>
            전체삭제
          </span>
        )}
      </div>

      <RecentSearch>
        <KeywordList>
          <div className="container">
            {list.length > 0 ? (
              list.map((item: string) => (
                <div
                  key={item}
                  onClick={() => {
                    handleCurrentKeyword(item);
                  }}
                >
                  {item}
                </div>
              ))
            ) : (
              <span className="no_list">검색 내역이 없습니다.</span>
            )}
          </div>
        </KeywordList>
      </RecentSearch>

      <Filter>
        <div>
          <h3>정렬 방법</h3>
          <div className="period">
            {sort_list.map((item) => (
              <div
                className={sort === item.value ? "sort" : ""}
                key={item.value}
                onClick={() => setSort(item.value)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>검색 기간</h3>
          <div className="period">
            {date_list.map((item) => (
              <div
                className={date === item.name ? "date" : ""}
                key={item.name}
                onClick={() => handleDate(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </Filter>
    </Container>
  );
}

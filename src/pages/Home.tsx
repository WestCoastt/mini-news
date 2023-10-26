import axios from "axios";
import Card from "../components/Card";
import Topbar from "../components/Topbar";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useCategory } from "../store/store";
import Skeleton from "../components/Skeleton";

const Container = styled.div<{ $pb: boolean }>`
  position: relative;
  min-height: 100vh;

  .card_container {
    width: 100%;
    padding: 20px;
    padding-top: ${(props) => (props.$pb ? "88px" : "136px")};
    padding-bottom: 100px;

    display: inline-flex;
    flex-direction: column;
    gap: 12px;

    a {
      text-decoration: none;
    }
  }

  .no_list {
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
  }
`;

export interface Data {
  byline: { original: string };
  headline: { main: string };
  keywords: { name: string; value: string }[];
  pub_date: string;
  source: string;
  web_url: string;
  _id: string;
}

export interface News {
  title: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
}

export default function Home() {
  const search = useLocation().pathname.includes("search");
  const { category } = useCategory();
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const empty = new Array(7).fill("");

  const fetchArticle = async ({ pageParam = 1 }) => {
    const data = await axios.get(
      `https://newsapi.org/v2/${
        keyword ? "everything?" : "top-headlines?country=kr"
      }${
        keyword ? `q=${keyword}` : `&category=${category}`
      }&apiKey=a0f9ad467a3748b98eb2333555ddb3e8&page=${pageParam}&pageSize=10`
    );
    return { ...data, page: pageParam };
  };

  const { isLoading, isRefetching, data, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery(["get-article"], fetchArticle, {
      getNextPageParam: (data) => {
        const total_page = Math.ceil(data.data.totalResults / 10);
        if (total_page <= data.page) return;
        return data.page + 1;
      },
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    refetch();
  }, [category, keyword]);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (target) {
      const onIntersect = async (
        [entry]: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          if (hasNextPage) {
            await fetchNextPage();
          }
          observer.observe(entry.target);
        }
      };
      observer = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, fetchNextPage, hasNextPage]);

  if (isLoading || isRefetching) {
    return (
      <Container $pb={search}>
        <Topbar />
        <div className="card_container">
          {empty.map((a, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container $pb={search}>
      <Topbar />
      <div className="card_container">
        {data &&
          data.pages.map((el) =>
            el.data.articles.map((item: News) => (
              <Link key={item.url} to={item.url}>
                <Card data={item} />
              </Link>
            ))
          )}
        <div ref={setTarget} />
      </div>
    </Container>
  );
}

# 미니 뉴스

> 뉴스 헤드라인을 보여주고 뉴스 검색을 할 수 있습니다


## 사용 방법

```
npm i
yarn install
```

```
npm start
yarn start
```

[newsapi.org](https://newsapi.org/) 에서 apikey를 발급받고

```
Home.tsx

const apiKey = "apikey를 입력해주세요"
```

## 기술스택

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=black"> <img src="https://img.shields.io/badge/Zustand-007054?style=for-the-badge&logo=Zustand&logoColor=black"> <img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=StyledComponents&logoColor=black">

## 구현한 기능

- React Query 의 useInfiniteQuery를 활용하여 무한스크롤을 구현하였습니다.
- 상태관리를 위해 Zustand를 활용하였고, persist 미들웨어를 사용하여 스크랩 목록과 최근검색어 목록을 로컬스토리지에 담을 수 있게끔 만들었습니다.

## 시연영상

https://github.com/WestCoastt/mini-news/assets/98147070/de328539-5dba-4925-988f-ea3cf19ebaf4

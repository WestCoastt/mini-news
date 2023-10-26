import styled from "styled-components";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Scrap from "./pages/Scrap";
import Search from "./pages/Search";

const Container = styled.div`
  max-width: 560px;
  margin: 0 auto;
  height: 100%;
  background: var(--BG---Gray);
`;

function App() {
  const search_page = useLocation().pathname.includes("search");
  return (
    <Container>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/scrap" element={<Scrap />} />
        <Route path="/search" element={<Search />} />
      </Routes>

      {!search_page && <NavBar />}
    </Container>
  );
}

export default App;

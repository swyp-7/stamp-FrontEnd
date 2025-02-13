import MainNav from "components/molecules/Main/MainNav";
import styled from "styled-components";

const main = () => {
  return (
    <Layout>
      <MainNav activeIcon="Home" />
    </Layout>
  );
};

export default main;

const Layout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 112px 1fr;
  background-color: #f8f8f8;
`;

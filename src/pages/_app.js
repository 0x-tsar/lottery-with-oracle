import "../../styles/globals.css";
import { AuthProvider } from "../provider/context";
import Header from "../components/Header";

import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px calc(100vh - 80px);
  grid-template-areas:
    "header"
    "main";
`;

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <AuthProvider>
        <Header></Header>
        <Component {...pageProps} />
      </AuthProvider>
    </Container>
  );
}

export default MyApp;

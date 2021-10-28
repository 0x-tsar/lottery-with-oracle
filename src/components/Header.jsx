import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  grid-area: header;
  background-color: darkblue;

  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Header = () => {
  return <Container></Container>;
};

export default Header;

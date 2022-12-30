import React, { useContext } from "react";
import { Container, Menu, Image } from "semantic-ui-react";
import ThemeContext from "../Context/ThemeContext";

const AppHeader = () => {
  const theme = useContext(ThemeContext);

  return (
    <Menu fixed="top" inverted={!theme}>
      <Container>
        <Menu.Item as="a" header href="/">
          <Image size="mini" src="/logo512.png" style={{ marginRight: '1.5em' }} />
          ASIC power dashboard
        </Menu.Item>
        <Menu.Item as="a" href="/">Home</Menu.Item>
        <Menu.Item as="a" href="/crud/">Add ASIC</Menu.Item>
      </Container>
    </Menu >
  );
}

export default AppHeader;
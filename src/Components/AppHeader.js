import React from "react";
import { Container, Menu, Image } from "semantic-ui-react";

const AppHeader = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header href="/">
          <Image size="mini" src="/logo512.png" style={{ marginRight: '1.5em' }} />
          ASIC power dashboard
        </Menu.Item>
        <Menu.Item as="a" href="/">Home</Menu.Item>
        <Menu.Item as="a" href="/add">Add ASIC</Menu.Item>
      </Container>
    </Menu >
  );
}

export default AppHeader;
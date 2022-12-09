import React from "react";
import { Container, Menu, Image } from "semantic-ui-react";

const Header = () => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item as="a" header>
        <Image size="mini" src="/logo512.png" style={{ marginRight: '1.5em' }} />
        ASIC power dashboard
      </Menu.Item>
      <Menu.Item as="a" href="/">Home</Menu.Item>
      <Menu.Item as="a">CRUD</Menu.Item>
    </Container>
  </Menu>
);

export default Header;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.div`
  font-size: 18px;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 56px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
`;

const Navbar = (): React.ReactElement => {
  return (
    <NavbarContainer>
      <Link to="/hello"><button>yo</button></Link>
    </NavbarContainer>
  );
};

export default Navbar;

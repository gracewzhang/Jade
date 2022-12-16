import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LogoIllustration } from '../../illustrations/Logo.illustration';

const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: white;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px 1px lightgrey;
`;

const LinkContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MiddleIconsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLogoIllustration = styled(LogoIllustration)`
  height: 40px;
`;

const Navbar = (): React.ReactElement => {
  return (
    <NavbarContainer>
      <LinkContainer>
        <Link to="/"><StyledLogoIllustration /></Link>
        <MiddleIconsContainer>
          <Link to="/hello"><button>yo</button></Link>
          <Link to="/hello"><button>yo</button></Link>
          <Link to="/hello"><button>yo</button></Link>
        </MiddleIconsContainer>
        <Link to="/hello"><button>yo</button></Link>
      </LinkContainer>
    </NavbarContainer>
  );
};

export default Navbar;
